const sequelize = require('../config/connection');
const Forum = require('../models/forum');
const SubscribedForum = require('../models/subscribedForum');

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
    const forumId = req.params.id;
    const userId = (req.user) ? req.user.id : -1;
    Forum.findByPk(forumId, {
        include: [{
            model: SubscribedForum,
            as: 'subscribedForums',
            where: {usersId: userId},
            required: false
        }]
    })
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('Error:\t', error)
            res.sendStatus(500);
        });
}

const findByName = (req,res) => {
    const query = req.query.q;
    console.log('query');
    Forum.findAll()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('Error:\t', error);
            res.sendStatus(500);
        })
}


module.exports = {
    findAll,
    findOne,
    findByName
}