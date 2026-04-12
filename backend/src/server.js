require('dotenv').config();
const app=require('./app');
const PORT=3000|| 4000;

const connectDB = require('./config/database');
connectDB();
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});