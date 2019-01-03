// Node Core Modules
const path = require('path');

// 3rd Party Modules
const express = require('express');

// Custom Modules
const productCtrl = require('../controllers/products');

const router = express.Router();

router.get('/', productCtrl.getProducts);

router.get('/products', productCtrl.get)

router.get('/cart');

router.get('/checkout');
module.exports = router;