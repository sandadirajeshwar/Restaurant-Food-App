const restarentModel = require("../models/restarentModel")

// RESTARENT CONTROLLER
const createRestarentController = async (req, res) =>{
    console.log("Create Restaurant API hit", req.body);
    try {
        const {title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords} = req.body
        if(!title || !coords){
            return res.status(500).send({
                success: false,
                message: "Title and Coords are required"
            })
        }
        const newRestarent = new restarentModel({title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords})
        await newRestarent.save()
        res.status(201).send({
            success: true,
            message: "New Restarent added successfully",
            newRestarent,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in create restarent API",
            error
        })
    }
}

// ALL REATARENT CONTROLLER
const getAllRestarentController = async (req, res) =>{
    try {
        const restarents = await restarentModel.find({})
        if(!restarents){
            return res.status(404).send({
                success: false,
                message: "No restarent found"
            })
        }
        res.status(200).send({
            success: true,
            totalCount: restarents.length,
            restarents,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in get all restarent API",
            error
        })
    }
}

// GET RESTARENT BY ID CONTROLLER
const getRestarentByIdController = async (req, res) =>{
    try {
        const restarenId = req.params.id
        const restarent = await restarentModel.findById(restarenId)
        if(!restarenId){
            return res.status(404).send({
                success: false,
                message: "No restarent ID found"
            })
        }
        if(!restarent){
            return res.status(404).send({
                success: false,
                message: "No restarent found"
            })
        }
        res.status(200).send({
            success: true,
            restarent,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in get restarent by ID API",
            error
        })
    }
}

// DELETE RESTARENT CONTROLLER
const deleteRestarentController = async (req, res) =>{
    try {
        const restarentId = req.params.id
        if(!restarentId){
            return res.status(404).send({
                success: false,
                message: "No restarent ID found"
            })
        }
        await restarentModel.findByIdAndDelete(restarentId)
        res.status(200).send({
            success: true,
            message: "Restarent deleted successfully",
        })
    }catch (error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in delete restarent API",
            error
        })
    }
}

module.exports = {createRestarentController, getAllRestarentController, getRestarentByIdController, deleteRestarentController};