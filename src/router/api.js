const express = require('express');
const apiController = require('../controller/apiController');

const router = express.Router();
router.get('/products', apiController.getProducts);
router.get('/categories', apiController.getCategories);
router.get('/products/:id', apiController.getProductById);
module.exports = router;
