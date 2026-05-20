const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use('/auth', require('./routes/auth.js'));
app.use('/contacts', require('./routes/contacts.js'));

mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connected to MongoDB")).catch((err) => console.log(err));

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
});






