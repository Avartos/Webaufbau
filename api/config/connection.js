const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    //Database
    "Squid", 
    //Username
    'root',
    //Password
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases: 0,
        logging: false,
        pool: {
            // number of max simultaneous connections
            max: 5,
            //number of min simultaneous connections
            min: 0,
            acquire: 30000,
            idle: 10000
        }
});

module.exports = sequelize;
global.sequelize = sequelize;