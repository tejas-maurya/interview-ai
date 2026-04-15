const axios = require("axios");

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
  try {
    const prompt = `
Generate STRICT JSON only (no extra text).

Format:
{
  "matchScore": number,
  "technicalQuestion": [
    { "question": "string", "intention": "string", "answer": "string" }
  ],
  "behavioralQuestion": [
    { "question": "string", "intention": "string", "answer": "string" }
  ],
  "skillGaps": [
    { "skill": "string", "severity": "minor | moderate | severe" }
  ],
  "preparationPlan": [
    { "day": "Day 1", "focus": "string", "tasks": ["task1"] }
  ],
  "describe": "string"
}

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}
`;

    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "phi3",   // ✅ YOUR MODEL
      prompt: prompt,
      stream: false
    });

    let text = response.data.response;

    // 🔥 Clean JSON
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const parsed = JSON.parse(text);

    return parsed;

  } catch (error) {
    console.error("AI ERROR:", error.message);
    throw new Error("Failed to generate interview report");
  }
}

module.exports = generateInterviewReport;