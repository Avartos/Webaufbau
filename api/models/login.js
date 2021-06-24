const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

module.exports = sequelize.define("Login", {
    passwordHash: {
        type:  Sequelize.STRING(255),
        allowNull: false,
    },
});