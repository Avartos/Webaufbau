const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const Rating = sequelize.define("Rating", {
    contributionsId: {
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    usersId: {
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    rating: Sequelize.INTEGER,
});

module.exports = Rating;