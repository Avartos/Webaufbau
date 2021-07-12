const Sequelize = require('../config/connection');
const Thread = require('../models/thread');
const User = require('../models/user');
const SubscribedThread = require('../models/subscribedThread');
const Forum = require('../models/forum');
const Contribution = require('../models/contribution')
const SubscribedForum = require('../models/subscribedForum');


const findFavorites = (req, res) => {
    const userID = req.user.id;
    Forum.findAll({
        attributes: [
            'title'
        ],
        include: [{
            model: Thread,
            as: 'threads',
            attributes: [
                'title',
                'id',
            ],
            include: [{
                model: SubscribedThread,
                as: 'subscribedThreads',
                where: {
                    usersId: userID
                },
                attributes: [],
                required: true
            }]
        }]
    }).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.error("Error:\t", error);
    })

}

const findPopular = (req, res) => {
    Thread.findAll({
        attributes: [
            'id',
            'forumsId',
            'title',
             [Sequelize.fn('COUNT', 'contributions.id'), 'contributionsCount']
        ],
        include: [{
            model: Contribution,
            as: 'contributions',
            attributes: []
        }],
        group: ['contributions.threadsId'],
        order: [
            [Sequelize.fn('COUNT', 'contributions.id'), 'desc']
        ]
    }).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.error('Error:\t', error);
        res.sendStatus(500);
    })
}

const findLatest = (req, res) => {
    const limit = parseInt(req.query.limit);
    Thread.findAll({
        attributes: ['title',
            'updatedAt',
            'id'
        ],
        order: [
            ['updatedAt', 'desc']
        ],
        limit: limit

    }).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.error("Error:\t", error);
    })
}


module.exports = {
    findFavorites,
    findPopular,
    findLatest
}