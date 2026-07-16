const express = require("express");
const router = express.Router();

const {
    generateInsights,
} = require("../controllers/aiController");

router.post("/insights", generateInsights);

module.exports = router;