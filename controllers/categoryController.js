const categoryModel = require("../models/categoryModel")

// create category controller here
const createCategoryController = async (req, res) =>{
    try {
        const {title, imageUrl} = req.body
        if(!title){
            return res.status(500).send({
                success: false,
                message: "Please provide category title"
            })
        }
        const newCategory = new categoryModel({title, imageUrl})
        await newCategory.save()
        res.status(201).send({
            success: true,
            message: "New Category added successfully",
            newCategory,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in create category API",
            error
        })
    }
}

// GET ALL CATEGORIES CONTROLLER HERE
const getAllCategoryController = async (req, res) => {
    try {
        const categories = await categoryModel.find({})
        if(!categories){
            return res.status(404).send({
                success: false,
                message: "No categories found"
            })
        }
        res.status(200).send({
            success: true,
            totalCount: categories.length,
            categories,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in get all categories API",
            error
        })
    }
}

// UPDATE CONTROLLER
const updateCategoryController = async (req, res) => {
    try {
        const {id} = req.params
        const {title, imageUrl} = req.body
        const updateCategory = await categoryModel.findByIdAndUpdate(id, {title, imageUrl}, {new: true})
        if(!updateCategory){
            return res.status(404).send({
                success: false,
                message: "Category not found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
        })
    } catch (error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in update category API",
            error
        })
    }
}

//DELETE CONTROLLER
const deleteCategoryController = async (req, res) => {
    try {
        const {id} = req.params
        const deleteCategory = await categoryModel.findByIdAndDelete(id)
        if(!deleteCategory){
            return res.status(404).send({
                success: false,
                message: "Category not found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Category deleted successfully",
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in delete category API",
            error
        })
    }
}

// export the controller
module.exports = { createCategoryController, getAllCategoryController, updateCategoryController, deleteCategoryController };
