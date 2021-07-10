const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const Login = require('./login');
const Image = require('./image');

const User = sequelize.define("User", {
    loginsId: Sequelize.INTEGER,
    imagesId: Sequelize.INTEGER,
    userName: {
        type:  Sequelize.STRING(200),
        allowNull: false,
        uinique: true
    },
});

// setup for user-login mapping
User.belongsTo(Login, {as: 'login', foreignKey: 'loginsId' });
Login.hasOne(User, {as: 'user', foreignKey: 'loginsId'});

User.belongsTo(Image, {as: 'image', foreignKey: 'imagesId'});



module.exports = User;