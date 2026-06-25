const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authroutes");
const batchRoutes = require("./routes/batchRoutes");
const authMiddleware = require("./middleware/authmiddleware");
const errorHandler= require("./middleware/errorhandler");


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_STRING)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/", authRoutes);
app.use("/batches", authMiddleware, batchRoutes);

app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});