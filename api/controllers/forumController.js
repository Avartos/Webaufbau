const Sequelize = require('sequelize')
const sequelize = require('../config/connection');
const Forum = require('../models/forum');
const SubscribedForum = require('../models/subscribedForum');
const Thread = require('../models/thread');

const findAll = (req,res) => {
    const userId = (req.user) ? req.user.id : -1;
    Forum.findAll({
        attributes: [
            ['id','forumsID'],
            ['title','name'],
            [Sequelize.fn('date_format', Sequelize.col('forum.createdAt'), '%d.%m.%Y'), 'createdAt'],
            [Sequelize.fn('date_format', Sequelize.col('forum.updatedAt'), '%d.%m.%Y'), 'updatedAt'],
            ['shortDescription','description'],
            [sequelize.col('subscribedForums.usersId'), 'subscriptionUsersId'],
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
        group: ['forumsId'],
    }).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.error("Error:\t",error);
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
    const query = req.query.q;
    const queryArray = getQueryParametersMapped(query)
    Forum.findAll({
        attributes: [
            'title',
            [sequelize.fn("concat", "/threads/",sequelize.col('id')),'link']
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

// WIP
const countThreads = (req, res) => {
    Forum.findAll(

    ).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.error("Error:\t",error);
    })
}


module.exports = {
    findAll,
    findOne,
    countThreads,
    findByName
}