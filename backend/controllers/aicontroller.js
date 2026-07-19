const Batch = require("../models/batchmodel");
const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000",
        "X-OpenRouter-Title": "HerbalTrace"
    }
});

const generateInsights = async (req, res) => {
    try {

        const batches = await Batch.find(
            { organization: req.user.orgId },
            {
                _id: 0,
                batchNumber: 1,
                name: 1,
                plant: 1,
                productionDate: 1,
                "yield.quantity": 1,
                availableQuantity: 1,
                status: 1
            }
        )
        .sort({ productionDate: -1 })
        .lean();

        if (batches.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No batches found."
            });
        }

        const aiData = batches.map(batch => ({
            batch: batch.batchNumber,
            plant: batch.plant,
            productionDate: batch.productionDate,
            yield: batch.yield?.quantity ?? 0,
            available: batch.availableQuantity,
            status: batch.status
        }));

        const prompt = `
You are an AI production analyst for HerbalTrace, an essential oil batch management system.

Your task is to generate concise, professional production insights for a dashboard.

IMPORTANT BUSINESS RULES:
- "pending", "certified", "partially_dispatched", and "dispatched" are all NORMAL batch statuses.
- Never flag a batch because of its status.
- Never recommend investigating a dispatched or partially dispatched batch.
- Low available quantity after dispatch is expected.
- Only discuss production performance.

Analyze the production data and return ONLY these sections.

## 🟢 Overall Production
Write 2-3 concise sentences describing the current production.

## 🌿 Best Performing Plants
Mention ONLY the top 2 plants by yield.
Include the batch number and yield.

## ⚠️ Yield Observations
Only mention plants where one batch has significantly lower yield than other batches of THE SAME PLANT.
If there are no obvious low-yield batches, write:
"No unusual yield variations detected."

## 📈 Production Trends
Identify any simple trends such as:
- plants consistently producing high yields
- plants with inconsistent yields
- months with more production

If there isn't enough data, simply say:
"More historical data is required to identify reliable trends."

## 💡 Recommendations
Provide ONLY practical production recommendations.
Examples:
- Monitor consistency of Lavender production.
- Continue current production practices for Jasmine.
- Collect more production history.

DO NOT:
- Mention dispatch status.
- Mention certificates.
- Invent statistics.
- Mention information not present in the data.
- Repeat the same information in multiple sections.
The user is viewing a management dashboard.

Write like a production monitoring system, not like a consultant.

Keep every section short.

Use factual observations only.

Avoid subjective words such as:
- promising
- excellent
- poor
- successful
- concerning
- impressive

Do not praise or criticize production.

Recommendations should be conservative and only based on the supplied data.

If there is insufficient evidence for a conclusion, explicitly state that more data is required.

Production Data:

${JSON.stringify(aiData, null, 2)}
`;

        const completion = await client.chat.completions.create({
            model: "google/gemma-3-27b-it",
            messages: [
                {
                    role: "system",
                    content: "You are an expert essential oil production analyst."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.5
        });

        res.status(200).json({
            success: true,
            insights: completion.choices[0].message.content
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};
const chatWithAI = async (req, res) => {
    try {

        const { question } = req.body;

        const batches = await Batch.find(
            { organization: req.user.orgId },
            {
                _id: 0,
                batchNumber: 1,
                plant: 1,
                productionDate: 1,
                "yield.quantity": 1,
                availableQuantity: 1,
                status: 1
            }
        )
        .sort({ productionDate: -1 })
        .lean();

        if (batches.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No batches found."
            });
        }

        const aiData = batches.map(batch => ({
            batch: batch.batchNumber,
            plant: batch.plant,
            productionDate: batch.productionDate,
            yield: batch.yield?.quantity ?? 0,
            available: batch.availableQuantity,
            status: batch.status
        }));

        const prompt = `
You are an AI production analyst for HerbalTrace.

Your responses should be analytical and concise.

Guidelines:
- Base every statement only on the supplied production data.
- Compare records and summarize patterns instead of listing raw field values.
- Highlight meaningful differences when comparing batches or plants.
- Never infer causes (e.g., equipment issues, weather, operator error) unless explicitly supported by the data.
- If the data is insufficient to explain an observation, state that additional production history or operational data is required.
- Do not speculate or invent statistics.
- Write in a professional reporting style suitable for a production management dashboard.

Production Data:
${JSON.stringify(aiData, null, 2)}

When answering user questions:

- Answer the question directly.
- Analyze the supplied data instead of repeating it.
- Compare records where relevant.
- Do not speculate or infer causes.
- If the data is insufficient, explicitly say so.
- Keep responses concise and professional.
User Question:
${question}
`;

        const completion = await client.chat.completions.create({
            model: "google/gemma-3-27b-it",
            messages: [
                {
                    role: "system",
                    content: "You are an AI production analyst."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.4
        });

        res.status(200).json({
            success: true,
            reply: completion.choices[0].message.content
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};
module.exports = {
    generateInsights,
    chatWithAI
};