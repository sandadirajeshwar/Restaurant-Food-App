
const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { createCategoryController, getAllCategoryController, updateCategoryController, deleteCategoryController } = require('../controllers/categoryController');


const router = express.Router();

// routes

// ADD CATEGORY || POST
router.post('/create', authMiddleware, createCategoryController)

// GET ALL CATEGORIES || GET
router.get('/getAll', getAllCategoryController)

// UPDATE CATE
router.put('/update/:id', authMiddleware, updateCategoryController)

// DELETE CATEGORY || DELETE
router.delete('/delete/:id', authMiddleware, deleteCategoryController)


// export the router
module.exports = router;