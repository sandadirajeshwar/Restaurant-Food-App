const foodModel = require("../models/foodModel")

// FOOD CREATE CONTROLLER
const createFoodController = async (req, res) => {
    try {
        const {title, description, price, imageUrl, foodTags, category, code, isAvailable, restarent, rating, ratingCount} = req.body
        //validation
        if(!title || !description || !price || !restarent){
            return res.status(400).send({
                success: false,
                message: "Title, description, price and restarent are required"
            })
        }
        const newFood = new foodModel({title, description, price, imageUrl, foodTags, category, code, isAvailable, restarent, rating, ratingCount})
        await newFood.save()
        res.status(201).send({
            success: true,
            message: "New food item added successfully",
        })
    } catch (error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in create food API",
            error
        })
    }
    
}

// GET ALL FOODS CONTROLLER
const getFoodController = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        if(!foods){
            return res.status(404).send({
                success: false,
                message: "No foods found"
            })
        }
        res.status(200).send({
            success: true,
            totalCount: foods.length,
            foods,
        })
    } catch (error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in get all foods API",
            error
        })
    }
}

// GET SINGLE FOOD CONTROLLER
const getSingleFoodController = async (req, res) => {
    try {
        const {id} = req.params
        const foods = await foodModel.findById(id)
        if(!foods){
            return res.status(404).send({
                success: false,
                message: "Food item not found"
            })
        }
        res.status(200).send({
            success: true,
            foods,
        })
    } catch (error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in get single food API",
            error
        })
    }

}

//GET FOOD BY RESTARENT ID CONTROLLER
const getFoodRestarentById = async (req, res) => {
    try {
        const restarentId = req.params.id
        const restarent = await foodModel.find({restarent: restarentId})
        if(!restarent){
            return res.status(404).send({
                success: false,
                message: "Food item not found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Food items by restarent ID fetched successfully",
            restarent,
        })
    } catch (error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in get single Restaren API",
            error
        })
    }

}

//UPDATE FOOD CONTROLLER
const updateFoodController = async (req, res) => {
    try {
        const foodId = req.params.id
        if(!foodId){
            return res.status(404).send({
                success: false,
                message: "Food ID is required"
            })
        }
        const {title, description, price} = req.body
        //validation
        if(!title || !price){
            return res.status(400).send({
                success: false,
                message: "Title, description and price are required"
            })
        }
        const updateFood = await foodModel.findByIdAndUpdate(foodId, {title, description, price}, {new: true})
        if(!updateFood){
            return res.status(404).send({
                success: false,
                message: "Food item not found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Food item updated successfully",
        })
    } catch (error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in update food API",
            error
        })
    }
}

// DELETE FOOD CONTROLLER
const deleteFoodController = async (req, res) =>{
    try {
        const foodId = req.params.id
        if(!foodId){
            return res.status(404).send({
                success: false,
                message: "No food ID found"
            })
        }
        await foodModel.findOneAndDelete(foodId)
        
        res.status(200).send({
            success: true,
            message: "Food item deleted successfully",
        })
    } catch (error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in delete food API",
            error
        })
    }
}

// export the controllers
module.exports = { createFoodController, getFoodController, getSingleFoodController, getFoodRestarentById, updateFoodController, deleteFoodController };