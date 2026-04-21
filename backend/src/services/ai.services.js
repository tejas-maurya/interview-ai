const { GoogleGenAI } =require( "@google/genai");
const {z}=require("zod")
const {zodToJsonSchema }=require("zod-to-json-schema")
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const interviewReportSchema = z.object({
  matchScore: z.number().describe("The match score between the candidate's resume and the job describe"),

  technicalQuestion: z.array(
    z.object({
      question: z.string().describe("The technical question asked during the interview"),
      intention: z.string().describe("The intention behind the technical question"),
      answer: z.string().describe("The candidate's answer to the technical question"),
    })
  ),

  behavioralQuestion: z.array(
    z.object({
      question: z.string().describe("The behavioral question asked during the interview"),
      intention: z.string().describe("The intention behind the behavioral question"),
      answer: z.string().describe("The candidate's answer to the behavioral question"),
    })
  ),

  skillGaps: z.array(
    z.object({
      skill: z.string().describe("The specific skill gap identified during the interview"),
      severity: z.string().describe("The severity of the skill gap"),
    })
  ),

  preparationPlan: z.array(
    z.object({
      day: z.string().describe("The specific day for the preparation plan"),
      focus: z.string().describe("The focus area"),
      tasks: z.array(z.string()).describe("Tasks for the day"),
    })
  ),

  describe: z.string().describe("Overall performance summary") // ✅ ONLY ONE describe FIELD
});
async function generateInterviewReport({resume , selfDescription ,jobDescription}) {
  
  
  const prompt=`Generate an interview report based on the following information:\n
  Resume: ${resume}\n
  Self Description: ${selfDescription}\n
  Job Description: ${jobDescription}\n
  The interview report should include the following sections:\n
  1. Match Score: A score between 0 and 100 that indicates how well the candidate's resume matches the job describe.\n
  2. Technical Questions: A list of technical questions asked during the interview, along with the intention behind each question and the candidate's answer.\n
  3. Behavioral Questions: A list of behavioral questions asked during the interview, along with the intention behind each question and the candidate's answer.\n
  4. Skill Gaps: A list of specific skill gaps identified during the interview, along with the severity of each gap (e.g., minor, moderate, severe).\n
  5. Preparation Plan: A detailed preparation plan for the candidate to improve their chances of success in future interviews, including specific tasks and activities to focus on each day leading up to the next interview.\n
  Please provide the interview report in a structured format that can be easily parsed and analyzed.
  
  `;
 const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",

  contents: [
    {
      role: "user",
      parts: [{ text: prompt }]
    }
  ],

  config: {
    responseMimeType: "application/json",
    responseSchema: zodToJsonSchema(interviewReportSchema) 
  },
});
  const parsed = interviewReportSchema.parse(JSON.parse(response.text));
console.log(parsed);
}
module.exports={generateInterviewReport};