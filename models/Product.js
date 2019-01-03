// Core Node Modules
const fs = require('fs');
const path = require('path');

// 3rd party dependencies

// custom imports
const pathUtil = require('../util/path');
const p = path.join(pathUtil, 'data', 'products.json');

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, data) => {
        if (err) {
            console.log(err);
            cb([]);
        } else {

            cb(JSON.parse(data));
        }
    });
};


module.exports = class Product {
    constructor(t, p, desc) {
        this.title = t,
        this.price = p,
        this.description = desc
    }

    save() {
        getProductsFromFile( (products) => {
            products.push(this);
            console.log('products array when calling save', products);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    // static so I can call this method directly on the class itself and not on an instantiated object
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }


};