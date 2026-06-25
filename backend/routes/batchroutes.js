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
router.post("/", async (req, res,next) => {
  try {
    const { name, plant, yield } = req.body;

    if (!name || !plant) {
      return res.status(400).json({ message: "Name and plant required" });
    }
    const batchNumber = await generateBatchNumber(req.user.orgId);

    const batch = await Batch.create({
      name,
      plant,
      yield, // ✅ now consistent with schema
     batchNumber,
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



module.exports = router;