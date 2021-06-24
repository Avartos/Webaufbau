const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

module.exports = sequelize.define("SubscribedThread", {
    threadsId : {
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    usersId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
});