const router = require('express').Router();
const { createOrder, getOrders } = require('../controllers/orderController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/order', verifyToken, createOrder);
router.get('/get-order', verifyToken, getOrders);

module.exports = router;