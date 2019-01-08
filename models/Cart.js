// Core Node Modules
const fs = require('fs');
const path = require('path');

// 3rd party dependencies

// custom imports
const pathUtil = require('../util/path');
const p = path.join(pathUtil, 'data', 'cart.json');

const getProductsFromCartFile = (cb) => {
    fs.readFile(p, (err, data) => {
        if (err) {
            console.log(err);
            cb([]);
        } else {

            cb(JSON.parse(data));
        }
    });
};

module.exports = class Cart {

    // Add new product/ increase quantity
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if(!err) {
                cart = JSON.parse(fileContent);
            }
            // Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct) {
                updatedProduct = { ...existingProduct }; // spread operator to take existing properties and add them to new JS object
                updatedProduct.quantity = updatedProduct.quantity + 1; // add quantity property and increase it by 1
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct; 
            } else {
                updatedProduct = {id: id, quantity: 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(`Error: ${err}`);
            });
        });
    }
    // Remove Products
    static removeProduct(id, productPrice, quantity){
        console.log("quantity of product is: ", quantity);
        fs.readFile(p, (err, fileContent) => {
            if(err) {
                return;
            }
            const updatedCart = {...JSON.parse(fileContent)};
            const product = updatedCart.products.find(prod => prod.id == id);
            const quantity = product.quantity;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = parseInt(updatedCart.totalPrice) - parseInt(productPrice * quantity);

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(`Error: ${err}`);
            });
        });
    }

    static fetchAll(cb) {
        getProductsFromCartFile(cb);
    }
};