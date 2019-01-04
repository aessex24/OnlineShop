// Node Core Modules
const path = require('path');

// 3rd Party Modules
const express = require('express');

// Custom Modules
const shopCtrl = require('../controllers/shop');

const router = express.Router();

router.get('/', shopCtrl.getIndex);

router.get('/products', shopCtrl.getProducts);

//router.get('/product');

router.get('/cart', shopCtrl.getCart);

router.get('/checkout', shopCtrl.getCheckout);

router.get('/orders', shopCtrl.getOrders);

module.exports = router;