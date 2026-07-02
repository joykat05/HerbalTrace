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
    const { name, plant, yield } = req.body;

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

      // Initialize batch state
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
router.patch("/:id", async (req, res,next) => {
  try {
    const updated = await Batch.findOneAndUpdate(
      {
        _id: req.params.id,
        organization: req.user.orgId
      },
      req.body,
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
router.get("/search/filter", async (req, res,next) => {
  try {
    const { plant, startDate, endDate } = req.query;

    let filter = {
      organization: req.user.orgId
    };

    if (plant) {
      filter.plant = new RegExp(plant, "i");
    }

    if (startDate && endDate) {
      filter.productionDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const batches = await Batch.find(filter).sort({ createdAt: -1 });

    res.json(batches);

  } catch (err) {
    next(err);
  }
});


module.exports = router;