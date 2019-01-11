// core node modules
const path = require('path');

// 3rd party dependencies
const express = require('express');
const bodyParser = require('body-parser');
//const expressHbs = require('express-handlebars');

// custom imports
const adminRoutes= require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorCtrl = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/Product');
const User = require('./models/User');
const Cart = require('./models/Cart');
const CartItem = require('./models/CartItem');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');


const app = express();

//app.engine('handlebars', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout'}));
app.set('view engine', 'ejs');
//app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false})); //registers middleware to parse incoming requests
app.use(express.static(path.join(__dirname, 'public'))); //dynamically register css
app.use( (req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user; //stored as a sequelize object not a regular JS object
        next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorCtrl.get404);

//Defining association between admin user and creating a product in the shop not purchases
Product.belongsTo(User, {
    constraints: true, 
    onDelete: 'CASCADE'
});

// explicit definition of association.
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User); //Will add key to cart which is the user id to chich the cart belongs

/*
    Many-to-Many Relationship
    A cart belongs to many products and a product belongs to many carts, 
    it's a many-to-many relationship because one cart can hold multiple products
    and a single product can be part of multiple different carts.
    
    Need an intermediate table that connects them which basically stores a combination
    of product IDs and cart IDs
*/
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});

/*
    one to many
    A user can have many orders
    An order can only belong to a single user that places the order
    
    Many to many through Order items.
    An order can belong to many products.


*/
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});

// npm start runs this
sequelize
    //.sync({force: true})
    .sync()
    .then( result => {
        return User.findByPk(1)
    })
    .then( user => {
        if(!user) {
            return User.create({name: 'andrew', username: 'aessex', email:'test@test.com'});
        }
        return user;
    })
    .then( user => {
        //console.log(user);
        return user.createCart();
    })
    .then( cart => {
        app.listen(3000);
    })
    .catch( err => {
        console.log(err);
    });

