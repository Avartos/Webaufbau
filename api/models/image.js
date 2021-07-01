const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const Image = sequelize.define("Image", {
    profilePicturePath: Sequelize.STRING(256),
    description: Sequelize.STRING(256),
});

module.exports = Image;