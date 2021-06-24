const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const Thread = require('./thread');
const User = require('./user');

const SubscribedThread = sequelize.define("SubscribedThread", {
    threadsId : {
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    usersId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
});

module.export = SubscribedThread;