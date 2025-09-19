
const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { createFoodController, getFoodController, getSingleFoodController, getFoodRestarentById, updateFoodController, deleteFoodController } = require('../controllers/foodController');


const router = express.Router();

// routes

// ADD FOOD || POST
router.post('/create', authMiddleware, createFoodController)

// GET ALL FOODS || GET
router.get('/getAll', getFoodController)

// GET SINGLE FOOD || GET
router.get('/getSingle/:id', authMiddleware, getSingleFoodController)

// GET FOOD RESTARENT BY ID || GET
router.get('/getRestarentId/:id', authMiddleware, getFoodRestarentById)

// UPDATE FOOD || PUT
router.put('/updateFood/:id', authMiddleware, updateFoodController)

// DELETE FOOD || DELETE
router.delete('/deleteFood/:id', authMiddleware, deleteFoodController)



// export the router
module.exports = router;