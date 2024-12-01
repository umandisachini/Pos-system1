const express = require('express');
const Controllers= require('../controllers/productController');

const productsrouter = express.Router();

productsrouter.get('/products', Controllers.getProducts);
productsrouter.get('/getproduct/:id',Controllers.getProductById);
productsrouter.post('/addproducts', Controllers.createProduct);
productsrouter.put('/products/:id', Controllers.updateProduct);
productsrouter.delete('/deleteproducts/:id', Controllers.deleteProduct);

module.exports = productsrouter;
