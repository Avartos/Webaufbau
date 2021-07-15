const Sequelize = require('sequelize')
const sequelize = require('../config/connection');
const Forum = require('../models/forum');
const SubscribedForum = require('../models/subscribedForum');
const Thread = require('../models/thread');


// basic condition for forum requests
const findAll = (req,res) => {
    const userId = (req.user) ? req.user.id : -1;
    Forum.findAll({
        attributes: [
            //renames the attributes for better processing
            ['id','forumsID'],
            ['title','name'],
            //reformats the date
            [Sequelize.fn('date_format', Sequelize.col('forum.createdAt'), '%d.%m.%Y'), 'createdAt'],
            [Sequelize.fn('date_format', Sequelize.col('forum.updatedAt'), '%d.%m.%Y'), 'updatedAt'],
            ['shortDescription','description'],
            [sequelize.col('subscribedForums.usersId'), 'subscriptionUsersId'],
            //count the threads inside a forum
            [sequelize.fn('COUNT', 'threads.id'), 'numberOfThreads']
        ],
        include: [{
            model: Thread,
            as: 'threads',
            attributes: [
                'id'
            ]
        },
        {
            model: SubscribedForum,
            as: 'subscribedForums',
            required: false,
            where: {usersId: userId},
            attributes:[]
        }
        ],
        //needed to count the threads
        group: ['forumsId'],
    }).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.error('Error:\t',error);
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

const getQueryParametersMapped = (query) =>
{
    const queryArray = query.split(' ');
    const mappedArray = queryArray.map((queryString) => {
        return ({
            [Sequelize.Op.substring]: queryString
        });
    });
    return mappedArray;
}

const findByName = (req,res) => {
    const query = decodeURIComponent(req.query.q);
    const queryArray = getQueryParametersMapped(query)
    Forum.findAll({
        attributes: [
            [sequelize.fn('concat', 'Forum:'),'flag'],
            'title',
            [sequelize.fn('concat', '/threads/',sequelize.col('id')),'link']
        ],
        where: {
            title:
                {
                    [Sequelize.Op.or]: queryArray
                }
            }
        })
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