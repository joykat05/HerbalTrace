const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authroutes");
const batchRoutes = require("./routes/batchRoutes");
const authMiddleware = require("./middleware/authmiddleware");
const errorHandler= require("./middleware/errorhandler");
const authLimiter = require("./middleware/rateLimiter");
const aiRoutes = require("./routes/airoutes.js");
const userroutes = require("./routes/userroutes.js");
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

mongoose.connect(process.env.MONGODB_STRING)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", authLimiter, authRoutes);
app.use("/batches", authMiddleware, batchRoutes);
app.use("/api/ai", authMiddleware, aiRoutes);
app.use("/user", authMiddleware , userroutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});