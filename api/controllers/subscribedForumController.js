const sequelize = require('../config/connection');
const SubscribedForum = require('../models/subscribedForum');

const findAll = (req,res) => {
    SubscribedForum.findAll()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log("Error:\t", error);
            res.sendStatus(500);
        })
}

const findOne = (req, res) => {
    const SubscribedForumId = req.params.id;
    SubscribedForum.findByPk(SubscribedForumId)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log("Error:\t", error)
            res.sendStatus(500);
        });
}


module.exports = {
    findAll,
    findOne,
}