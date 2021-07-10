const sequelize = require('../config/connection');
const Forum = require('../models/forum');
const SubscribedForum = require('../models/subscribedForum');
const Thread = require('../models/thread');

const findAll = (req,res) => {
    Forum.findAll(
        {attributes: [
            'id',
            [sequelize.col('title'), 'name'],
            [sequelize.col('shortDescription'), 'description'],
            'createdAt',
            'updatedAt'
        ],
        include: [{
            model: SubscribedForum,
            as: 'subscribedForums'
        }]}
    )
    
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

const countThreads = (req, res) => {
    const forumId = 1;
    Thread.count({
        group: ['threadsId'],
        include: [{
          model: Forum,
          as: 'forum',
          where: {
            forumsId: forumId
          }
        }],
      })
      .then(data => {
        res.json(data);
    })
    .catch(error => {
        console.log('Error:\t', error)
        res.sendStatus(500);
    });
}


module.exports = {
    findAll,
    findOne,
    countThreads,
}