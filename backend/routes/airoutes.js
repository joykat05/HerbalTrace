const express = require("express");
const router = express.Router();

const {
    generateInsights,
    chatWithAI,
} = require("../controllers/aicontroller");

router.post("/insights", generateInsights);
router.post("/chat", chatWithAI);

module.exports = router;