const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const ApiToken = sequelize.define("ApiToken", {
    apiToken: {
        allowNull: false,
        type: Sequelize.STRING(256),
    }
});
