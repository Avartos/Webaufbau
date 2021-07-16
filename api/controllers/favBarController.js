const Sequelize = require('sequelize');

const Thread = require('../models/thread');
const SubscribedThread = require('../models/subscribedThread');
const Forum = require('../models/forum');
const Contribution = require('../models/contribution')


const findFavorites = (req, res) => {
    const userID = req.user.id;
    Forum.findAll({
        attributes: [
            'id',
            'title'
        ],
        include: [{
            model: Thread,
            as: 'threads',
            attributes: [
                'title',
                'id',

            ],
            required: true,
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
    const limit = parseInt(req.query.limit);
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
        res.json(data.slice(0, limit));
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