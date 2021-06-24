const Sequelize = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');
const Thread = require('./thread');

const Contribution = sequelize.define("Contribution", {
    usersId: Sequelize.INTEGER,
    content: Sequelize.STRING(10000),
});

User.hasMany(Contribution, {as : 'contributions', foreignKey: 'usersId'});
Contribution.belongsTo(User, {as: "user", foreignKey: 'usersId'});

Thread.hasMany(Contribution, {as : 'contributions', foreignKey: 'threadsId'});
Contribution.belongsTo(Thread, {as: "threads", foreignKey: 'threadsId'});

module.exports = Contribution;