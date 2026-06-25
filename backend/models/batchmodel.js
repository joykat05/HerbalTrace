const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  plant: {
    type: String,
    required: true
  },

  batchNumber: {
    type: String,
    unique: true
  },

  yield: {
    quantity: Number,
    unit: {
      type: String,
      enum: ["kg", "liters"]
    }
  },

  productionDate: {
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

module.exports = mongoose.model("Batch", batchSchema);