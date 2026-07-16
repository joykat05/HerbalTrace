const Batch = require("../models/batchmodel");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const generateInsights = async (req, res) => {
    try {

        const batches = await Batch.find({
            organization: req.user.orgId
        }).sort({ productionDate: -1 });

       const aiData = batches.map(batch => ({
    batch: batch.batchNumber,
    plant: batch.plant,
    productionDate: batch.productionDate.toISOString().split("T")[0],
    yield: batch.yield?.quantity ?? 0,
    available: batch.availableQuantity,
    status: batch.status
}));

        const prompt = `
You are an expert essential oil production analyst.

Analyze the production batches below.

Return your answer in Markdown using these headings:

## Production Summary
- Brief summary of overall production.

## Best Performing Plants
- Mention plants with consistently high yields.

## Yield Trends
- Mention any increasing or decreasing trends.

## Unusual Batches
- Highlight batches that appear significantly lower than similar batches.

## Recommendations
- Give 3 practical recommendations for improving production.

Only use the supplied data. If there is not enough information to make a conclusion, explicitly say so instead of guessing.

Production Data:
${JSON.stringify(aiData, null, 2)}
`;

        const response = await ai.models.generateContent({
            model: "gemini-flash-latest",
            contents: prompt,
        });

        res.json({
            success: true,
            insights: response.text,
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

module.exports = { generateInsights };