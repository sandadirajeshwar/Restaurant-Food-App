const userModel = require("../models/userModel")
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

// Register Controller
const registerController = async (req, res) => {
    try {
        const {userName, email, password, phone, address, answers} = req.body
        // validation
        if(!userName || !email || !password || !address || !phone || !answers){
            return res.status(500).send(
                {
                    success: false,
                    message: "All fields are required",
                }
            )
        }
        // password hashing
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);
        // check user
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(500).send({
                success: false,
                message: "User already exists",
            })
        }
        // create new user
        const user = await userModel.create({userName, email, password:hashPassword, phone, address, answers})
        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user,
        })
    } catch (error){
        res.status(500).send(
            {
                success: false,
                message: "Error in register API",
                error
            }
        )
    }
}

// Login Controller
const loginController = async (req, res) => {
    try {
        const {email, password} = req.body
        // validation
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        // check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            })
        }
        // check user password | compare
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(500).send({
                success: false,
                message: "Invalid password"
            })
        }
        // token
        const token = await JWT.sign({ id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        })
        user.password = undefined
        await res.status(200).send({
            success: true,
            message: "Login successful",
            token,
            user,
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in login API",
            error,
        })
    }
}

module.exports = { registerController, loginController };