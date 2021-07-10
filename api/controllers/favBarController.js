const Sequelize = require('../config/connection');
const Thread = require('../models/thread');
const User = require('../models/user');
const SubscribedThread = require('../models/subscribedThread');
const Forum = require('../models/forum');
const SubscribedForum = require('../models/subscribedForum');


const findFavorites = (req, res) =>  {
    //TODO: make userID variable
    const userID = 1;
    Forum.findAll({
        attributes: [['title', 'forumTitle']],
        include: [{
            model:Thread,
            as: 'threads',
            attributes: [
                ['title', 'threadTitle'],
                ['id', 'threadID']
            ],
            include: [{
                model: SubscribedThread,
                as: 'subscribedThreads',
                where: {usersId: userID},
                attributes: []
            }]
        }]
    }).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.error("Error:\t",error);
    })

}

const findPopular = (req, res) =>  {
    Thread.findAll({
    //TODO: find a good query

    }).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.error("Error:\t",error);
    })
}

const findLatest = (req, res) =>  {
    Thread.findAll({
        attributes: [['title', 'threadTitle'],
        'updatedAt'],
        order: [
            [
                'updatedAt', 'desc'
            ]
        ],
        //TODO: make limit variable
        limit: 5

    }).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.error("Error:\t",error);
    })
}


module.exports = {
    findFavorites,
    findPopular,
    findLatest
}