const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require('./routes/authRoute.js');
const activitiesRoutes = require('./routes/activities.js')
const cors = require("cors");
require("dotenv").config();
const app = express();
const path=require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const mongoURI = process.env.MONGO_URI;


// app.get("/", (req, res) => {
//     res.send("Hello World");
// });


app.use('/api/auth', authRoutes);

app.use('/api/activities', activitiesRoutes);

app.use(express.static(path.join(__dirname, "../frontend")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"))
})

mongoose.
connect(mongoURI).
then(() => {
    console.log("Connected to MongoDB")
    app.listen(3000, () => {
        console.log("API is running on Port: 3000")
    })
    
}).catch((error) => {
    console.log(error);
});


