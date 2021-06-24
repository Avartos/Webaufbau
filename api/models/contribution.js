const Sequelize = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');

const Contribution = sequelize.define("Contribution", {
    usersId: Sequelize.INTEGER,
    content: Sequelize.STRING(10000),
});

User.hasMany(Contribution, {as : 'contributions', foreignKey: 'usersId'});
Contribution.belongsTo(Contribution, {as: "user", foreignKey: 'usersId'});

module.exports = Contribution;