const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(express.json());

const mongoURI = process.env.MONGO_URI;


mongoose.
connect(mongoURI).
then(() => {
    console.log("Connected to MongoDB")
    app.listen(3000, () => {
        console.log("API is running on Port: 3000")
    })
    
}).catch((error) => {
    console.log(error);
})