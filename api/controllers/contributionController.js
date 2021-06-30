const sequelize = require('../config/connection');
const Contribution = require('../models/contribution');
const User = require('../models/user');

const findAll = (req, res) => {
    const threadId = req.params.threadId;
    Contribution.findAll({
            where: {
                threadsId: threadId,
            },
            // include: [{
            //     model: User,
            //     as: 'user'
            // }]
        })
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            console.error("Error:\t", error);
            res.sendStatus(500);
        });
}

const findOne = (req, res) => {
    const id = req.params.id;
    Contribution.findByPk(id, {
            include: [{
                model: User,
                as: 'user'
            }]
        })
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.senStatus(500);
            console.error('Error:\t', error);
        })
}

const deleteOne = (req, res) => {
    const id = req.params.id;
    Contribution.destroy({
            where: {
                id: id
            }
        })
        .then(() => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.error('Error:\t', error);
            res.sendStatus(500);
        })
}

const update = (req, res) => {
    const contribution = req.body;
    Contribution.update(contribution)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error('Error:\t', error);
            res.sendStatus(500);
        });
}

module.exports = {
    findAll,
    findOne,
    deleteOne,
    update
}