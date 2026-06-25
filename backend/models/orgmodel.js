// models/Organization.js
const mongoose = require("mongoose");


const orgSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  batchCounter: {
  type: Number,
  default: 1000
}
});

module.exports = mongoose.model("Organization", orgSchema);