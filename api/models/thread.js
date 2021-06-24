const Sequelize = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');

const Thread = sequelize.define("Thread", {
    title: Sequelize.STRING(255),
    content: Sequelize.STRING(10000),
    usersId: Sequelize.INTEGER,
    forumsId: Sequelize.INTEGER,
});

Thread.belongsTo(User, {as: "user", foreignKey: 'usersId'});
User.hasMany(Thread, {as : 'threads', foreignKey: 'usersId'});

module.exports = Thread;