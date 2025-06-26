const router = require('express').Router();
const { addToCart, getCart } = require('../controllers/cartController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('add-to-cart', verifyToken, addToCart);
router.get('/carts', verifyToken, getCart);

module.exports = router;