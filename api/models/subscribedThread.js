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

// Setup for thread-subscribedThreads mapping
Thread.hasMany(SubscribedThread, {as:'subscribedThreads', foreignKey: 'threadsId'});
SubscribedThread.belongsTo(Thread, {as: ' thread', foreignKey: 'threadsId'});

module.exports = SubscribedThread;