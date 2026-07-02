const express = require("express");
const Batch = require("../models/batchmodel");
const Organization = require("../models/orgmodel");

const router = express.Router();


// 🔧 Batch Number Generator (clean format)
const generateBatchNumber = async (orgId) => {
  const org = await Organization.findByIdAndUpdate(
    orgId,
    { $inc: { batchCounter: 1 } },
    { new: true }
  );

  return `B-${org.batchCounter}`;
};


// ✅ CREATE BATCH
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

    const user = await User.findById(req.user.userId).select("name");

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
        name: "Certificate Ready",
        value: statusCounts.certified,
      },
      {
        name: "Partially Dispatched",
        value: statusCounts.partially_dispatched,
      },
      {
        name: "Completed",
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



module.exports = router;