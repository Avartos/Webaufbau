const sequelize = require('../config/connection');
const Forum = require('../models/forum');

const findAll = (req,res) => {
    Forum.findAll()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('Error:\t', error);
            res.sendStatus(500);
        })
}

const findOne = (req, res) => {
    const ForumId = req.params.id;
    Forum.findByPk(ForumId)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('Error:\t', error)
            res.sendStatus(500);
        });
}


module.exports = {
    findAll,
    findOne,
}