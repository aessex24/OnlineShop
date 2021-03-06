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
        return cart.getProducts()
        .then( (products) => {
            res.render('shop/cart', {
                docTitle: 'Your Cart',
                path: '/cart',
                products: products
            });
        })
        .catch(err => console.log(err));
    })
    .catch( err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    console.log(`Product Id to be added to cart: ${prodId}`);
    req.user.getCart()
    .then( cart => {
        fetchedCart = cart;
        return cart.getProducts({ where: {id: prodId} });
    })
    .then( products => {
        let product;
        if(products.length > 0) {
            product = products[0];
        }
        if(product) {
            // get old quantity for this product and then change it
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return product;
        }
        return Product.findByPk(prodId);
    })
    .then( product => {
        return fetchedCart.addProduct(product, {
            through: { quantity: newQuantity }
        });
    })
    .then ( () => {
        res.redirect('/products');
    })  
    .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    let product;
    let updatedQuantity = 0;
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({ where: {id: prodId } });
    })
    .then( products => {
        product = products[0];
        if(product) {
            const currentQuantity = product.cartItem.quantity;
            if(currentQuantity <= 1){
                return product.cartItem.destroy();
            }
            else {
                console.log(`current quantity: ${currentQuantity}`);
                updatedQuantity = currentQuantity - 1;
                console.log(`new quantity ${updatedQuantity}`);
                return product.cartItem.update({quantity: updatedQuantity});
            }
        }
    })
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err.message));

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
    req.user.getOrders({include: ['products'] })
    .then(orders => {
        res.render('shop/orders', {
            docTitle: 'My Orders',
            path: '/orders',
            orders: orders
        });
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user
    .getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts();
    })
    .then(products => {
        return req.user.createOrder()
        .then(order => {
            order.addProducts(products.map(product => {
                product.orderItem = {quantity: product.cartItem.quantity}
                return product;
            }));
        })
        .catch(err => console.log(err));
    })
    .then(result => {
        return fetchedCart.setProducts(null)
    })
    .then( result => {
        res.redirect('/orders');
    })
    .catch(err => console.log(err));
};


// exports.getCheckout = (req, res, next) => {
//     res.render('shop/checkout', {
//         docTitle: 'Checkout',
//         path: '/checkout'
//     })
// }



