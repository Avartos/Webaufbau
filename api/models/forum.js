const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const User = require('./user');

const Forum = sequelize.define("Forum", {
    title: Sequelize.STRING(255),
    shortDescription: Sequelize.STRING(1000),
});

Forum.belongsTo(User, {as: "user", foreignKey: 'usersId'});
User.hasMany(Forum, {as : 'threads', foreignKey: 'usersId'});

module.exports = Forum;