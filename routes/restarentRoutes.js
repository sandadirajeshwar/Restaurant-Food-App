const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { createRestarentController, getAllRestarentController, getRestarentByIdController, deleteRestarentController } = require('../controllers/restarentController');

const router = express.Router();

// routes

// ADD RESTARENT || POST
router.post('/create', authMiddleware, createRestarentController)

// GET ALL RESTARENTS || GET
router.get('/getAl', authMiddleware, getAllRestarentController)

// GET SINGLE RESTARENT || GET
router.get('/:id', authMiddleware, getRestarentByIdController)

// DELETE RESTARENT || DELETE
router.delete('/deleteId/:id', authMiddleware, deleteRestarentController)

// export the router
module.exports = router;