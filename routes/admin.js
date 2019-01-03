// node core modules
const path  = require('path');

// 3rd Party Modules
const express = require('express');

// Custom imports
const productsCtrl = require('../controllers/products');

const router = express.Router();

// implicitly this route is reached under /admin/add-product => GET
router.get('/add-product', productsCtrl.getAddProduct);

// implicitly this route is reached under /admin/add-product => POST
router.post('/add-product', productsCtrl.postAddProduct);

module.exports = router;
