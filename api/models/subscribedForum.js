const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const Forum = require('./forum');

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

// Setup for Forum-subscribedForum mapping
Forum.hasMany(SubscribedForum, {as : 'subscribedForums', foreignKey: 'forumsId'});
SubscribedForum.belongsTo(Forum, {as: "forums", foreignKey: 'forumsId'});

module.exports = SubscribedForum;