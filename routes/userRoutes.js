const express = require('express');
const { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteUserController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// routes

// GET USER || GET
router.get('/getUser', authMiddleware, getUserController)

// UPDATE USER || PUT
router.put('/upUser', authMiddleware, updateUserController)

// password update
router.post('/updatePassword', authMiddleware, updatePasswordController)

// RESSET PASSWORD || POST
router.post('/resetPassword', authMiddleware, resetPasswordController)

// DELETE USER || DELETE
router.delete('/deleteUser/:id', authMiddleware, deleteUserController)

// export the router
module.exports = router;