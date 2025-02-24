const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const logincontroller = require('../controllers/login12')

// Define routes
router.get('/', userController.getusers);
router.get('/count', userController.getuserscount);
router.post('/', userController.postusers);
router.put('/:id', userController.putusersid);
router.delete('/:id', userController.deleteusersid);
router.post("/login", logincontroller.postlogin);
router.post("/register", logincontroller.register);

// router.post("/authenticateToken", logincontroller.auth   enticateToken);

module.exports = router;
