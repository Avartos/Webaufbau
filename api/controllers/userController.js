const User = require('../models/user.js');
const Login = require('../models/login.js');
const Image = require('../models/image.js');


const findAll = (req,res) => {
    User.findAll({
        include: [
            {model: Login, as : 'login'},
            {model: Image, as: 'image'},
        ]
    }).then(data => {
        res.json(data)
    }).catch(error => {
        console.error("Error:\t", error);
        res.sendStatus(500);
    })
}

const findOne = (req,res) => {
    const userId = req.params.id;


    User.findByPk(userId, {
        include: [
            {model: Login, as: 'login'},
            {model: Image, as: 'image'},
        ]
    }).then(data => {
        res.json(data);
    }).catch(error => {
        console.error("Error:\t", error);
        res.sendStatus(500);
    })  
}


module.exports = {

    findAll,
    findOne,

}