const sequelize = require('../config/connection');
const rating = require('../models/rating');

const findAll = (req,res) => {
    rating.findAll()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('Error:\t', error);
            res.sendStatus(500);
        })
}

const findOne = (req, res) => {
    const ratingId = req.params.id;
    rating.findByPk(ratingId)
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