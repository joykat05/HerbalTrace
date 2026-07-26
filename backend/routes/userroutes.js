const express = require("express");
const User = require("../models/usermodal");
const Organization = require("../models/orgmodel");
const Batch = require("../models/batchmodel");
const Dispatch = require("../models/dispatchmodel");

const router = express.Router();

// GET /users/profile
router.get("/profile", async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "name email role organization"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const org = await Organization.findById(req.user.orgId).select("name");

    // ==========================
    // Activity Calculations
    // ==========================

    const [totalBatchesAdded, totalDispatchesAdded] = await Promise.all([
      Batch.countDocuments({
        organization: req.user.orgId,
        createdBy: req.user.userId,
      }),
      Dispatch.countDocuments({
        organization: req.user.orgId,
        createdBy: req.user.userId,
      }),
    ]);

    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        organization: org?.name,
      },
      activity: {
        totalBatchesAdded,
        totalDispatchesAdded,
      },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;