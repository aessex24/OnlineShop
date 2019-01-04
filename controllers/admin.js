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
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const product = new Product(title, price, imageUrl, description);
    product.save();
    res.redirect('/'); 
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll( (products) => {
        res.render('admin/products', { prods: products,
            docTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
};

exports.getEditProduct = (req, res, next) => {
    res.render('/admin/edit-product', {
        docTitle: 'Edit Product',
        path: '/admin/edit'
    });
};

