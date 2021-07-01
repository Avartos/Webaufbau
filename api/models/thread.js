const Sequelize = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');
const Forum = require('./forum');

const Thread = sequelize.define("Thread", {
    title: Sequelize.STRING(255),
    content: Sequelize.STRING(10000),
    usersId: Sequelize.INTEGER,
    forumsId: Sequelize.INTEGER,
});

// Setup for thread-user mapping
Thread.belongsTo(User, {as: 'user', foreignKey: 'usersId'});
User.hasMany(Thread, {as: 'threads', foreignKey: 'usersId'});

// setup for thread-forum mapping
Forum.hasMany(Thread, {as: 'threads', foreignKey: 'forumsId'});
Thread.belongsTo(Thread, {as: 'forum', foreignKey: 'forumsId'});

module.exports = Thread;