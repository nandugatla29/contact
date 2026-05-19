const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const e = require('express');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(
{
    origin: 'http://localhost:5173',
    credentials: true

}
));

mongoose.connect(process.env.MONGO_URL). then(()=>console.log("Connected to MongoDB")).catch((err)=>console.log(err));

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
});






