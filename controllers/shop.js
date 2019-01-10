const Product = require('../models/Product');


exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then( products => {
            res.render('shop/product-list', { 
                prods: products,
                docTitle: 'All Products',
                path: '/products'
            });
        })
        .catch( err => console.log(err.message));
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then( (product) => {
            res.render('shop/product-detail', {
                docTitle: product.title,
                product: product,
                path: '/products'
            });
        })
        .catch( err => console.log(err.message));
}

exports.getCart = (req, res, next) => {
    req.user.getCart()
    .then( cart => {
        return cart.getProducts();
    })
    .then( (products) => {
        res.render('shop/cart', {
            docTitle: 'Your Cart',
            path: '/cart',
            products: products
        });
    })
    .catch( err => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then( products => {
            res.render('shop/index', { 
                prods: products,
                docTitle: 'Shop',
                path: '/'
            });
        })
        .catch( err => console.log(err.message));
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        docTitle: 'My Orders',
        path: '/cart'
    });
};


exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        docTitle: 'Checkout',
        path: '/checkout'
    })
}



