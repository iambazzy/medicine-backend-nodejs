const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/orders.controller');
const { verifyUser } = require('../middleware/user.middleware.js');

router.post('/add-order', verifyUser, OrdersController.addOrder);
router.get('/get-order', verifyUser, OrdersController.getOrder);
router.put('/cancel-order', verifyUser, OrdersController.cancelOrder);

module.exports = router;
