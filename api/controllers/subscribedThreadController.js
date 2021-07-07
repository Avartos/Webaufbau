const Sequelize = require('sequelize');
const Contribution = require('../models/contribution');
const SubscribedThread = require('../models/subscribedThread');
const Thread = require('../models/thread');

const findAll = (req, res) => {
    SubscribedThread.findAll()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('Error:\t', error);
            res.sendStatus(500);
        })
}

const findOne = (req, res) => {
    const subscribedThreadId = req.params.id;
    SubscribedThread.findByPk(subscribedThreadId)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('Error:\t', error)
            res.sendStatus(500);
        });
}

const deleteOne = (req, res) => {
    const threadId = req.params.id;
    const userId = (req.user.id) ? req.user.id : -1;
    SubscribedThread.destroy({
        where: {
            usersId: userId,
            threadsId: threadId
        },
    }, ).then(() => {
        res.sendStatus(200);
    }).catch(error => {
        console.error('Error:\t', error);
        res.sendStatus(500);
    });
}

const add = (req, res) => {
    const threadId = req.params.id;
    const userId = (req.user.id) ? req.user.id : -1;
    console.log(userId);
    const newSubscription = SubscribedThread.build({
        usersId: userId,
        threadsId: threadId,
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

// TODO: Need to filter subscriptions, where the timestamp is older than one contribution
const findNew = (req, res) => {
    SubscribedThread.findAll({
            where: {
                // usersId: currentUserId,
                // timeStamp: {
                //     [Sequelize.Op.lt]: sequelize.col('threads.contributions.createdAt')
                // }
            },
            include: [{
                model: Thread,
                as: 'threads',
                include: [{
                    model: Contribution,
                    as: 'contributions',
                    where: {
                        createdAt: {
                                [Sequelize.Op.lt]: new Date()
                            }
                    }
                }]
            }],
            order: [
                [{model: Thread, as: 'threads'}, {model: Contribution, as: 'contributions'}, 'createdAt', 'DESC']
            ]
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
    deleteOne,
    add,
    findNew,
}