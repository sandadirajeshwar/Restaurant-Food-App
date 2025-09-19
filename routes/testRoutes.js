const express = require('express');
const { testUserController } = require('../controllers/testController');

// Create a router
const router = express.Router();

// Routes GET | POST | PUT | DELETE
router.get("/test-user", testUserController)

// export the router    
module.exports = router;