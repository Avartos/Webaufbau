const sequelize = require('../config/connection');
const Login = require('../models/login');

const findOne = (req,res) => {
    const id = req.params.id;
    const result = Login.find(login => parseInt(login.id) === parseInt(id));
    if(result){
        res.json(result);
    } else {
        res.sendStatus(500);
    } 
}

const add = (req,res) => {
    const userId = req.params.id;
}