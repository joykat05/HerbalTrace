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
    type: String
  },

  yield: {
    quantity: Number,
    unit: {
      type: String,
      enum: ["ml"]
    }
  },

  availableQuantity: {
    type: Number
  },

  status: {
    type: String,
    enum: [
      "pending",
      "certified",
      "partially_dispatched",
      "dispatched"
    ],
    default: "pending"
  },

  certificate: {
    pdf: {
      type: String
    },
    labName: {
      type: String
    },
    issuedDate: {
      type: Date
    },
    expiryDate: {
      type: Date
    },
    uploadedAt: {
      type: Date
    }
  },

  dispatches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dispatch"
  }],

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

batchSchema.index(
  { organization: 1, batchNumber: 1 },
  { unique: true }
);

module.exports = mongoose.model("Batch", batchSchema);