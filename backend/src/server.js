require('dotenv').config();
const {generateInterviewReport}=require("./services/ai.services")
const {resume , selfDescription ,jobDescription}=require('./services/test')
const app=require('./app');
const PORT=3000|| 4000;

const connectDB = require('./config/database');
connectDB();
async function start() {
  try {
    const result = await generateInterviewReport({
      resume,
      selfDescription,
      jobDescription,
    });

    console.log("Final Result:", result);
  } catch (err) {
    console.error("Handled Error:", err.message);
  }
}

start();
// Test the AI service
// main()
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});