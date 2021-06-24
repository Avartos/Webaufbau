const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

module.exports = sequelize.define("Image", {
    profilePicturePath: Sequelize.STRING(256),
    description: Sequelize.STRING(256),
});