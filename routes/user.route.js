const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { verifyUser } = require('../middleware/user.middleware');

// User
router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);
router.post('/verify', UserController.verifyToken);

// Address
router.post('/add-address', verifyUser, UserController.addAddress);
router.get('/get-address', verifyUser, UserController.getAddress);
router.put('/update-address', verifyUser, UserController.updateAddress);
router.delete('/delete-address', verifyUser, UserController.deleteAddress);

module.exports = router;