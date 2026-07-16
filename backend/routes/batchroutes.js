const express = require("express");
const Batch = require("../models/batchmodel");
const Organization = require("../models/orgmodel");

const router = express.Router();
const multer = require("multer");

const upload = multer({
  dest: "uploads/"
});




const generateBatchNumber = async (orgId) => {
  const org = await Organization.findByIdAndUpdate(
    orgId,
    { $inc: { batchCounter: 1 } },
    { new: true }
  );

  return `B-${org.batchCounter}`;
};



router.post("/", async (req, res, next) => {
  try {
    const { name, plant, yield, productionDate } = req.body;

    if (!name || !plant || !yield?.quantity || !yield?.unit) {
      return res.status(400).json({
        message: "Name, plant and yield are required."
      });
    }

    const batchNumber = await generateBatchNumber(req.user.orgId);

    const batch = await Batch.create({
  name,
  plant,
  batchNumber,
  yield,

  productionDate: productionDate || Date.now(),

  availableQuantity: yield.quantity,
  status: "pending",

  organization: req.user.orgId,
  createdBy: req.user.userId
});

    res.status(201).json(batch);

  } catch (err) {
    next(err);
  }
});

// GET /batches/dashboard
router.get("/dashboard", async (req, res, next) => {
  try {
    // Fetch user & organization
    const org = await Organization.findById(req.user.orgId).select("name");
    const User = require("../models/usermodal"); // adjust path if needed

    const user = await User.findById(req.user.userId).select("name role");

    // Fetch all batches for this organization
    const batches = await Batch.find({
      organization: req.user.orgId,
    });

    // ==========================
    // KPI Calculations
    // ==========================

    const totalBatches = batches.length;

    const totalYield = batches.reduce(
      (sum, batch) => sum + (batch.yield?.quantity || 0),
      0
    );

    const averageYield =
      totalBatches > 0 ? totalYield / totalBatches : 0;

    const availableQuantity = batches.reduce(
      (sum, batch) => sum + (batch.availableQuantity || 0),
      0
    );

    // ==========================
    // Status Chart
    // ==========================

    const statusCounts = {
      pending: 0,
      certified: 0,
      partially_dispatched: 0,
      dispatched: 0,
    };

    batches.forEach((batch) => {
      statusCounts[batch.status]++;
    });

   const statusChart = [
  {
    name: "Pending",
    value: statusCounts.pending,
  },
  {
    name: "Certified",
    value: statusCounts.certified,
  },
  {
    name: "Partially Dispatched",
    value: statusCounts.partially_dispatched,
  },
  {
    name: "Completely Dispatched",
    value: statusCounts.dispatched,
  },
];

    // ==========================
    // Yield Chart
    // ==========================

    const yieldChart = batches.map((batch) => ({
      name: batch.plant,
      value: batch.yield?.quantity || 0,
    }));

    // ==========================
    // Final Response
    // ==========================

    res.json({
      user: {
        name: user?.name,
        organization: org?.name,
        role : user?.role
      },

      kpis: {
        totalBatches,
        averageYield: Number(averageYield.toFixed(2)),
        availableQuantity,
      },

      statusChart,
      yieldChart,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/search", async (req, res, next) => {
  try {
    const { query, status } = req.query;

    const filter = {
      organization: req.user.orgId,
    };

    if (status) {
      const statuses = status.split(",");
      filter.status = { $in: statuses };
    }

    if (query) {
      filter.$or = [
        { batchNumber: new RegExp(query, "i") },
        { name: new RegExp(query, "i") },
      ];
    }

    const batches = await Batch.find(filter)
      .select("_id batchNumber name availableQuantity")
      .sort({ batchNumber: 1 })
      .limit(10);

    res.json(batches);
  } catch (err) {
    next(err);
  }
});

// 🔍 SEARCH / FILTER
router.get("/search/filter", async (req, res, next) => {
  try {
    const { search, startDate, endDate } = req.query;

    let filter = {
      organization: req.user.orgId,
    };

    if (search) {
      filter.$or = [
        { batchNumber: new RegExp(search, "i") },
        { plant: new RegExp(search, "i") },
      ];
    }

    if (startDate && endDate) {
      filter.productionDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const batches = await Batch.find(filter).sort({ createdAt: -1 });

    res.json(batches);
  } catch (err) {
    next(err);
  }
});

// ✅ GET ALL
router.get("/", async (req, res,next) => {
  try {
    const batches = await Batch.find({
      organization: req.user.orgId
    }).sort({ createdAt: -1 });

    res.json(batches);

  } catch (err) {
    next(err);
  }
});



// ✅ GET SINGLE
router.get("/:id", async (req, res,next) => {
  try {
    const batch = await Batch.findOne({
      _id: req.params.id,
      organization: req.user.orgId
    });

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    res.json(batch);

  } catch (err) {
    next(err);
  }
});

router.get("/:id/certificate", async (req, res, next) => {
  try {

    const batch = await Batch.findOne({
      _id: req.params.id,
      organization: req.user.orgId,
    }).select("batchNumber name certificate status");

    if (!batch) {
      return res.status(404).json({
        message: "Batch not found",
      });
    }

    res.json(batch);

  } catch (err) {
    next(err);
  }
});

router.post("/:id/certificate", upload.single("pdf"), async (req, res, next) => {
  try{
    console.log(req.body);
    console.log(req.file);

    const {
        labName,
        issuedDate,
        expiryDate
    } = req.body;

    const pdf = req.file?.path;
    const batch = await Batch.findOne({
      _id: req.params.id,
      organization: req.user.orgId,
    });

    if (!batch) {
      return res.status(404).json({
        message: "Batch not found",
      });
    }

    batch.certificate = {
      pdf,
      labName,
      issuedDate,
      expiryDate,
      uploadedAt: new Date(),
    };

    batch.status = "certified";

    await batch.save();

    res.json({
      message: "Certificate uploaded successfully",
      batch,
    });

  } catch (err) {
    next(err);
  }
});

const Dispatch = require("../models/dispatchmodel");

// POST /batches/:id/dispatch
router.post("/:id/dispatch", async (req, res, next) => {
  try {
    const { buyerName, quantity } = req.body;

    if (!buyerName || !quantity?.value || !quantity?.unit) {
      return res.status(400).json({
        message: "Buyer name and quantity are required.",
      });
    }

    const batch = await Batch.findOne({
      _id: req.params.id,
      organization: req.user.orgId,
    });

    if (!batch) {
      return res.status(404).json({
        message: "Batch not found.",
      });
    }

    // Optional: Only certified batches can be dispatched
    if (batch.status === "pending") {
      return res.status(400).json({
        message: "Batch must be certified before dispatch.",
      });
    }

    // Check available quantity
    if (quantity.value > batch.availableQuantity) {
      return res.status(400).json({
        message: `Only ${batch.availableQuantity} ml available.`,
      });
    }

    // Create dispatch
    const dispatch = await Dispatch.create({
      batch: batch._id,
      buyerName,
      quantity,
      organization: req.user.orgId,
      createdBy: req.user.userId,
    });

    // Update available quantity
    batch.availableQuantity -= quantity.value;

    // Save dispatch reference
    batch.dispatches.push(dispatch._id);

    // Update status
    if (batch.availableQuantity === 0) {
      batch.status = "dispatched";
    } else {
      batch.status = "partially_dispatched";
    }

    await batch.save();

    res.status(201).json({
      message: "Dispatch created successfully.",
      dispatch,
      batch,
    });

  } catch (err) {
    next(err);
  }
});

// ✅ UPDATE
router.patch("/:id", async (req, res, next) => {
  try {
    const updateData = { ...req.body };

    // If yield quantity is updated, keep availableQuantity in sync
    if (updateData.yield?.quantity !== undefined) {
      updateData.availableQuantity = updateData.yield.quantity;
    }

    const updated = await Batch.findOneAndUpdate(
      {
        _id: req.params.id,
        organization: req.user.orgId,
      },
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Batch not found" });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
});



// ✅ DELETE
router.delete("/:id", async (req, res,next) => {
  try {
    const deleted = await Batch.findOneAndDelete({
      _id: req.params.id,
      organization: req.user.orgId
    });

    if (!deleted) {
      return res.status(404).json({ message: "Batch not found" });
    }

    res.json({ message: "Batch deleted" });

  } catch (err) {
    next(err);
  }
});




module.exports = router;