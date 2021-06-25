const Sequelize = require('sequelize');
const sequelize = require('../config/connection');
const Thread = require('../models/thread');

const SubscribedThread = sequelize.define("SubscribedThread", {
    threadsId : {
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

Thread.hasMany(SubscribedThread, {as : 'subscribedThreads', foreignKey: 'threadsId'});
SubscribedThread.belongsTo(Thread, {as: "threads", foreignKey: 'threadsId'});

module.exports = SubscribedThread;