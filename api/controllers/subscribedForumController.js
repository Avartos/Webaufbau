const sequelize = require('../config/connection');
const SubscribedForum = require('../models/subscribedForum');

const findAll = (req,res) => {
    SubscribedForum.findAll()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('Error:\t', error);
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
            console.log('Error:\t', error)
            res.sendStatus(500);
        });
}

const add = (req, res) => {
    const forumId = req.params.id;
    const userId = (req.user.id) ? req.user.id : -1;
    const newSubscription = SubscribedForum.build({
        usersId: userId,
        forumsId: forumId,
    });

    newSubscription.save()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error('Error:\t', error);
            res.sendStatus(500);
        });
}


const deleteOne = (req, res) => {
    const forumId = req.params.id;
    const userId = (req.user.id) ? req.user.id : -1;
    SubscribedForum.destroy({
        where: {
            usersId: userId,
            forumsId: forumId
        },
    }, ).then(() => {
        res.sendStatus(200);
    }).catch(error => {
        console.error('Error:\t', error);
        res.sendStatus(500);
    });
}

module.exports = {
    findAll,
    findOne,
    add,
    deleteOne
}