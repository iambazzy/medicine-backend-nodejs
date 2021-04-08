const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart.controller');
const { verifyUser } = require('../middleware/user.middleware');

router.post('/add', verifyUser, CartController.addToCart);
router.get('/', verifyUser, CartController.getCart);
router.delete('/remove', verifyUser, CartController.removeProductFromCart);

module.exports = router;