const Product = require('../models/Product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {docTitle: 'Add Product', 
    path: '/admin/add-product',
    activeAddProduct: true,
    formsCSS: true,
    productCSS: true}); // Allows to send a response and attach a body of type any.
};

exports.postAddProduct = (req, res, next) => {
    //console.log('add product', req.body);
    const product = new Product(req.body.title, req.body.price, req.body.description);
    product.save();
    res.redirect('/'); 
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll( (products) => {
        res.render('shop/product-list', {prods: products, 
            docTitle: 'Shop', 
            path: '/', 
            activeShop: true,
            productCSS: true
        }); // Allows to send a response and attach a body of type any.
    });
};

