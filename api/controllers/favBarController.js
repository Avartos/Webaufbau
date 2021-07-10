const Sequelize = require('../config/connection');
const Thread = require('../models/thread');
const User = require('../models/user');
const SubscribedThread = require('../models/subscribedThread');
const Forum = require('../models/forum');
const Contribution = require('../models/contribution')
const SubscribedForum = require('../models/subscribedForum');


const findFavorites = (req, res) =>  {
    // const userID = req.user.id;
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
    Contribution.findAll({
    attributes: [
    ],
    include: {
        model: Thread,
        as: 'thread',
        attributes: [['title', 'threadTitle'],
        ['id', 'threadID']
        ],
    }

    }).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.error("Error:\t",error);
    })
}

const findLatest = (req, res) =>  {
    const limit = parseInt(req.query.limit);
    Thread.findAll({
        attributes: [['title', 'threadTitle'],
        'updatedAt',
        ['id', 'threadID']],
        order: [
            [
                'updatedAt', 'desc'
            ]
        ],

        limit: limit

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