# PROMPTS.md

# AI Prompt Engineering Log

## Project
**Herbal Batch Traceability Certificate Management System**

---

# Prompt Variation 1

## Role
You are an expert essential oil production analyst.

## Prompt

Analyze the production data below.

Provide:

- Production Summary
- Best Performing Plants
- Yield Trends
- Unusual Batches
- Recommendations

Only use the supplied data.
Never invent information.

Production Data:

```javascript
${JSON.stringify(aiData, null, 2)}
```

### Example Input

Production data containing essential oil batches with plant names, yield, production dates, and batch information.

### Example Output

Production Summary

Production data includes Rosemary, Lavender, Jasmine, and Rose batches. Reported yields range from 100 to 300 units across the available batches.

Best Performing Plants
Jasmine (Batch B-1010) recorded the highest yield at 300.
Rosemary batches consistently produced yields above 200.
Yield Trends
Jasmine shows noticeable variation between batches (125–300).
Lavender batches range from 100 to 200, indicating some yield variation.
More historical production data is required to confirm long-term trends.
Unusual Batches
Lavender (Batch B-1017) produced a lower yield than the other Lavender batch.
Jasmine (Batch B-1014) produced a lower yield compared with the other Jasmine batches.
No other significant production variations are evident from the available data.
Recommendations
Monitor yield consistency for Lavender and Jasmine in future production cycles.
Continue collecting production history to establish baseline yield ranges for each plant.
Compare future batches against historical averages before identifying anomalies.

The prompt lacked business rules, so the AI sometimes treated normal statuses (e.g., partially dispatched) as anomalies and generated responses that were too lengthy for a dashboard.

---

# Prompt Variation 2

## Role

You are an agricultural production analyst for an essential oil manufacturing company.

## Prompt

Business Rules:

- "partially_dispatched" is normal.
- "dispatched" is normal.
- Low available quantity after dispatch is expected.
- Certificate status is never an anomaly.
- Only discuss production-related insights.
- Compare yields only between batches of the same plant.
- Never invent statistics.
- State when insufficient data exists.

Return ONLY:

- 🟢 Overall Production
- 🌿 Best Performing Plant
- ⚠️ Yield Alerts
- 📈 Trends
- 💡 Recommendation

Production Data:

```javascript
${JSON.stringify(aiData, null, 2)}
```

### Example Input

Production records for Lavender, Jasmine, Rosemary, and Rose batches.

### Example Output

🟢 Overall Production 
Current production is focused on Rosemary, Lavender, Jasmine, and Rose, with yields ranging from 125 to 300. All batches are currently in pending, certified, or partially dispatched states, which is within expected parameters. 
🌿 Best Performing Plant
 Jasmine (Batch B-1010) demonstrates the highest yield at 300. 
⚠️ Yield Alerts
 Lavender (Batch B-1017) yielded 100, significantly lower than Lavender (Batch B-1011) which yielded 200. Jasmine (Batch B-1014) yielded 125, lower than other Jasmine batches (B-1010 at 300 and B-1016 at 150). Insufficient data exists to determine if these yield variations are consistent or represent a broader trend. 
📈 Trends
 No clear production trends can be identified with the limited dataset. There is a recent concentration of production towards the end of June and beginning of July. There is no data available to determine seasonal yield fluctuations. 
💡 Recommendation 
 Investigate the factors contributing to the lower Lavender yield in Batch B-1017. Analyze Jasmine production processes to understand the yield variation between batches. Collect historical data to establish baseline yields for each plant and identify significant deviations.

Business rules improved accuracy, but the AI still occasionally repeated information and identified weak trends from a limited dataset.

---

# Prompt Variation 3

## Role (System Prompt)

You are an AI production analyst for HerbalTrace, an essential oil batch management system.

## Prompt

Business Rules:

- pending, certified, dispatched, and partially_dispatched are all normal.
- Never flag batch status.
- Only discuss production performance.
- Mention only factual observations.
- Do not invent statistics.
- Do not repeat information.
- Keep every section concise.
- Recommendations must be conservative and data-driven.

Return ONLY:

- 🟢 Overall Production
- 🌿 Best Performing Plants
- ⚠️ Yield Observations
- 📈 Production Trends
- 💡 Recommendations

Production Data:

```javascript
${JSON.stringify(aiData, null, 2)}
```

### Example Input

Essential oil production dataset containing batch number, plant name, yield, production date, and production details.

### Example Output

🟢 Overall Production
Current production includes Rosemary, Lavender, Jasmine, Rose, and Lilly. Production dates range from June 2nd to July 4th, 2026. Yields vary by plant type.

🌿 Best Performing Plants
Jasmine (B-1010) yielded 300. Rose (B-1009) yielded 300.

⚠️ Yield Observations
Lavender batch B-1017 yielded 100, while batch B-1011 yielded 200.

📈 Production Trends
More historical data is required to identify reliable trends.

💡 Recommendations
Monitor consistency of Lavender production. Collect more production history.

The output was concise, avoided repetition, ignored normal business statuses, and generated dashboard-friendly insights.

---

# Best Prompt

**Prompt Variation 3** produced the best results.

It generated concise, structured, and dashboard-friendly insights while consistently following the project's business rules. It avoided false anomaly detection related to dispatch or certificate status and only reported production-related observations supported by the supplied data. The recommendations were conservative, factual, and suitable for a management dashboard, making this prompt the most reliable for the application.