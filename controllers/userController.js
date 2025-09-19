const userModel = require("../models/userModel");
const bcrypt = require('bcrypt')

// GET user INFO
const getUserController = async (req, res) => {
    try {
        // find user
        const user = await userModel.findById(req.user.id)
        //validation
        if(!user){
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }
        //hide
        user.password = undefined
        //response
        res.status(200).send({
            success: true,
            message: "User data fetched successfully",
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in get user API",
            error
        })
    }
}

// UPDATE user INFO
const updateUserController = async (req, res) => {
    try {
        // find user
        const user = await userModel.findById(req.user.id )
        // validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }
        // update user
        const { userName, phone, address} = req.body
        if(userName) user.userName = userName
        if(phone) user.phone = phone
        if(address) user.address = address
        await user.save()
        // hide password
        user.password = undefined
        // response
        await res.status(200).send({
            success: true,
            message: "User profile updated successfully",
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in update user API",
            error
        })
    }
}

// password update controller
const updatePasswordController = async (req, res) => {
    try {
        // find user
        const user = await userModel.findById(req.user.id)
        // validation
        if(!user){
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }
        // get data from user
        const {oldPassword, newPassword} = req.body
        if(!oldPassword || !newPassword){
            return res.status(400).send({
                success: false,
                message: "Please provide old and new password"
            })
        }
        // check old password
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if(!isMatch){
            return res.status(400).send({
                success: false,
                message: "Old password is incorrect"
            })
        }
        // hash new password
        var salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(newPassword, salt);
        user.password = hashPassword
        await user.save()
        res.status(200).send({
            success: true,
            message: "Password updated successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in update password API",
            error
        })
    }
}

// RESET password controller
const resetPasswordController = async (req, res) =>{
    try {
        const {email, newPassword, answers} = req.body
        if(!email || !newPassword || !answers){
            return res.status(500).send({
                success: false,
                message: "Please provide email, new password and answer"
            })
        }
        const user = await userModel.findOne({email, answers})
        // validation
        if(!user){
            return res.status(500).send({
                success: false,
                message: "Wrong email or answer"
            })
        }
        // hash new password
        var salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(newPassword, salt);
        user.password = hashPassword
        await user.save()
        await res.status(200).send({
            success: true,
            message: "Password updated successfully"
        })
    } catch (error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in reset password API",
            error
        })
    }
}

// DELETE USER CONTROLLER
const deleteUserController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success: true,
            message: "User deleted successfully"
        })
    } catch (error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in delete user API",
            error
        })
    }
}
module.exports = { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteUserController };