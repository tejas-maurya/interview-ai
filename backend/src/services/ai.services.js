const { GoogleGenAI } =require( "@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "hello gemini ! Explain what is interview",
  });
  console.log(response.text);
}
module.exports=main
