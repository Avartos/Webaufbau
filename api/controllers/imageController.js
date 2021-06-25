const sequelize = require('../config/connection');
const Image = require('../models/image');

const findAll = (req,res) => {
    Image.findAll()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('Error:\t', error);
            res.sendStatus(500);
        })
}

const findOne = (req, res) => {
    const imageId = req.params.id;
    Image.findByPk(imageId)
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
