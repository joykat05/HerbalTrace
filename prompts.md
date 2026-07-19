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

- Production Summary
- Best Performing Plants
- Yield Trends
- Unusual Batches
- Recommendations

The model summarized production and identified high-yield batches, but sometimes included observations that were too general and lacked business-specific filtering.

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

- Overall Production
- Jasmine identified as highest-yield plant.
- Yield alerts for lower Lavender and Jasmine batches.
- Limited production trends.
- Recommendations to monitor production consistency.

This version produced much cleaner and more accurate output by following the business rules.

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

- Overall production summary
- Top two performing plants
- Yield observations only when comparing the same plant
- Short production trends
- Practical recommendations based only on supplied data

The output was concise, avoided repetition, ignored normal business statuses, and generated dashboard-friendly insights.

---

# Best Prompt

**Prompt Variation 3** produced the best results.

It generated concise, structured, and dashboard-friendly insights while consistently following the project's business rules. It avoided false anomaly detection related to dispatch or certificate status and only reported production-related observations supported by the supplied data. The recommendations were conservative, factual, and suitable for a management dashboard, making this prompt the most reliable for the application.