const sequelize = require('../config/connection');
const Forum = require('../models/forum');
const Thread = require('../models/thread');
const Contribution = require('../models/contribution');

const getOneThread = (req,res) => {
    const threadId = req.params.id;

    Thread.findByPk(threadId, {
        include: [{
            model: Contribution,
            as: 'contributions',
            where: {threadsId: threadId},
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

const getOneForum = (req,res) => {
    const forumId = req.params.id;

    Forum.findByPk(forumId, {
        include:[{
            model: Thread,
            as: 'threads',
            where: {forumsId: forumId},
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