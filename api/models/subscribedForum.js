const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const SubscribedForum = sequelize.define("SubscribedForum", {
    forumsId : {
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    usersId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    timeStamp : {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

module.exports = SubscribedForum;