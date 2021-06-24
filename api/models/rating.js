const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

module.exports = sequelize.define("Rating", {
    contributionsId: Sequelize.INTEGER,
    usersId: Sequelize.INTEGER,
    rating: Sequelize.INTEGER,
});