const router = require('express').Router();
const { createOrder, getOrders } = require('../controllers/orderController');
const { verifyToken } = require('../middleware/auth');

router.post('/order', verifyToken, createOrder);
router.get('/get-order', verifyToken, getOrders);

module.exports = router;