const Sequelize = require('sequelize');


/*
    Create connection pool with sequelize object
*/
const sequelize = new Sequelize('node-complete', 'root', 'password', { 
    dialect: 'mysql',
    host: 'localhost' 
});

module.exports = sequelize;
