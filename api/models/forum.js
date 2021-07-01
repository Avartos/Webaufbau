const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const Forum = sequelize.define("Forum", {
    title: Sequelize.STRING(255),
    shortDescription: Sequelize.STRING(1000),
});

module.exports = Forum;