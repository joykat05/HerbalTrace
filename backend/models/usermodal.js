const mongoose = require("mongoose");


 const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["admin", "sales", "manager"],
    default: "manager"
  },

  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true
  }});

module.exports = mongoose.model("User", userSchema);