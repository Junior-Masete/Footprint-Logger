const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const Activities = require('../models/activities');
const bcrypt = require('bcryptjs');
const router = express.Router();
dotenv.config();

const jwtKey = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    console.log(req.body);
    try{
        const {name, surname, email, password} = req.body;

        if(!name || !surname || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });
        }

        const isUserExists = await User.findOne({email});
        if(isUserExists){
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            surname,
            email,
            password: hashPassword
        });

        await user.save();

        await Activities.create({
        user: user._id,
        userActivities: [],
        });

        res.status(201).json({
            success: true,
            message: `${user.name} registered successfully`
        })
    }
    catch(error){

        res.status(500).json({
            success: false,
            message: error.message || "Registration failed"
        })
    }
});

router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;

        // console.log(req.body);

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(409).json({
                success: false,
                message: "User does not exist"
            });
        }

        let isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        const token = jwt.sign({ userid: user._id, email: user.email } ,jwtKey);

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                token
            }
        });


    }
    catch(error){

    }
});

module.exports = router;



