const mongoose = require("mongoose");

const dispatchSchema = new mongoose.Schema({

  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
    required: true
  },

  buyerName: {
    type: String,
    required: true
  },

  quantity: {
    value: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      enum: ["ml"],
      required: true
    }
  },

  dispatchedAt: {
    type: Date,
    default: Date.now
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });

module.exports = mongoose.model("Dispatch", dispatchSchema);