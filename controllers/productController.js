const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
// fetch all products from the database
// This function retrieves all products from the database and sends them as a JSON response.
// If an error occurs, it sends a 500 status code with the error message.
exports.getProducts = async (req, res) => {
  try {
    // find all products in the database
    const products = await Product.find();
    // return the products as a JSON response
    res.json(products);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//fetch a single product by its ID
// This function retrieves a product by its ID from the database and sends it as a JSON response.
// If the product is not found, it sends a 404 status code with an error message.
exports.fetchSingleProduct = async (req, res) => {
    try {
        // find a single product by its ID
        const product = await Product.findById(req.params.id);
        // if product is not found, return 404 error
        if (!product) return res.status(404).json("Product not found");
        // return the product as a JSON response
        res.json(product);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

// update a product by its ID
// This function updates a product by its ID in the database and sends the updated product as a JSON response.
// If the product is not found, it sends a 404 status code with an error message.
// If an error occurs during the update, it sends a 500 status code with the error message.
exports.updateProduct = async (req, res) => {
  try {
    // find a product by its ID 
    const updatedProduct = await Product.updateOne(
      { _id: req.params.id,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        inStock: req.body.inStock,
        image: req.body.image
       });
       res.status(200).json("Product updated successfully");
  } catch (err) {
    res.json(err.message);
  }
}

// delete a product by its ID
// This function deletes a product by its ID from the database and sends a success message as a JSON response.
// If the product is not found, it sends a 404 status code with an error message.
// If an error occurs during the deletion, it sends a 500 status code with the error message.
exports.deleteProduct = async (req, res) => {
  try {
    // find a product by its ID and delete it
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    // if product is not found, return 404 error
    if (!deletedProduct) return res.status(404).json("Product not found");
    // return success message as a JSON response
    res.status(200).json("Product deleted successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
}