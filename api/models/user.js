const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const Login = require('./login');
const Image = require('./image');

const User = sequelize.define("User", {
    
    id: {
        type : Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    
    loginsId: Sequelize.INTEGER,
    imagesId: Sequelize.INTEGER,
    userName: {
        type:  Sequelize.STRING(200),
        allowNull: false,
        uinique: true
    },
});

User.belongsTo(Login, {as: 'login', foreignKey: 'loginsId' });
User.belongsTo(Image, {as: 'image', foreignKey: 'imagesId'});

module.exports = User;