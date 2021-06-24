const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

module.exports = sequelize.define("SubscribedForum", {
    forumsId : {
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    usersId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
});