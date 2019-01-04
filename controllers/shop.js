const Product = require('../models/Product');


exports.getProducts = (req, res, next) => {
    Product.fetchAll( (products) => {
        res.render('shop/product-list', {prods: products, 
            docTitle: 'Products', 
            path: '/products', 
        }); // Allows to send a response and attach a body of type any.
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById( prodId, product => {        
        res.render('shop/product-detail', {
            docTitle: product.title,
            product: product,
            path: '/products'
        });
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        docTitle: 'Your Cart',
        path: '/cart',
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll( (products) => {
        res.render('shop/index', {
            prods: products, 
            docTitle: 'Shop', 
            path: '/', 
        }); // Allows to send a response and attach a body of type any.
    });
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



