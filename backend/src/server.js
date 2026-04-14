require('dotenv').config();
const main=require("./services/ai.services")
const app=require('./app');
const PORT=3000|| 4000;

const connectDB = require('./config/database');
connectDB();
// main()
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});