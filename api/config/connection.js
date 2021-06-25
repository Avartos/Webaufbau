const Sequelize = require('sequelize');

/**
 * This file contains the basic setup for the database connection with sequelize
 */

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
        // set to true, to see the executed queries in console log
        logging: false,
        pool: {
            // number of max simultaneous connections
            max: 5,
            //number of min simultaneous connections
            min: 0,
            // the amount of time the pool is going to try to connect to the database, before throwing an error
            acquire: 30000,
            // the maximum time that the connection will wait until release (in milliseconds)
            idle: 10000
        }
});

module.exports = sequelize;
// module.exports = Sequelize;
global.sequelize = sequelize;