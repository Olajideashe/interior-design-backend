const router = require('express').Router();
const { createProduct, getProducts, deleteProduct } = require('../controllers/productController');
const { verifyAdmin } = require('../middleware/auth');

// create a new product
router.post('/create', verifyAdmin, createProduct);
// get all products
router.get('/fetch-all', getProducts);
// fetch a single product by its ID
router.get('/fetch/:id', getProducts);
// update a product by its ID
router.put('/update/:id', verifyAdmin, createProduct);
// delete a product by its ID
router.delete('/delete/:id', verifyAdmin, deleteProduct);

module.exports = router;