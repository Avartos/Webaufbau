const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const Login = sequelize.define("Login", {
    passwordHash: {
        type:  Sequelize.STRING(255),
        allowNull: false,
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    isEnabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
});

module.exports = Login;