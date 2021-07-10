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
            console.error('Error:\t', error);
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
            console.error('Error:\t', error)
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

const findNew = (req, res) => {
    const userId = (req.user) ? req.user.id : -1;
    SubscribedThread.findAll({
            attributes: [
                'usersId',
                'timeStamp',
                'threadsId',
                [Sequelize.col('thread.title'), 'threadTitle'],
            ],
            where: {
                usersId: userId
            },
            include: [{
                model: Thread,
                as: 'thread',
                attributes: [
                    'id',
                ],
                include: [{
                    model: Contribution,
                    as: 'contributions',
                    //ignore all posts that where written by the requesting user
                    where: {
                        usersId: {
                            [Sequelize.Op.ne]: userId
                        }
                    }
                }],
            }],
            order: [
                [{
                        model: Thread,
                        as: 'thread'
                    },
                    {
                        model: Contribution,
                        as: 'contributions'
                    }, 'createdAt', 'desc'
                ]
            ],
        })
        .then(data => {
            const filteredSubscriptions = extractUnreadNotifications(data);
            res.json(filteredSubscriptions);
        })
        .catch(error => {
            console.error('Error:\t', error);
        })
}

/**
 * Checks which subscriptions have contributions that are newer than the 
 * @param {*} threadSubscriptions subscriptions with thread and contributions attached
 * @returns thre new notficiations without contributions
 */
const extractUnreadNotifications = (threadSubscriptions) => {
    let newNotifications = threadSubscriptions.filter(subscription => {
        const lastReadDate = new Date(subscription.dataValues.timeStamp);
        const contributions = (subscription.dataValues.thread) ? subscription.dataValues.thread.dataValues.contributions : null;
        //check if the thread has any contributions
        if (contributions && contributions[0] && contributions.length > 0) {
            const lastContributionDate = new Date(contributions[0].dataValues.createdAt);
            //check if the date of the latest contribution is newer than the last checked timestamp
            if (lastContributionDate.getTime() > lastReadDate.getTime()) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    })

    //remove unneccessary contribution - attributes
    newNotifications = newNotifications.map(notification => {
        delete notification.dataValues.thread;
        return notification;
    })


    return newNotifications;
}


const updateTimestamp = (req, res) => {
    const threadId = req.params.id;
    const userId = (req.user) ? req.user.id : -1;

    SubscribedThread.findOne({
            where: {
                threadsId: threadId,
                usersId: userId
            }
        })
        .then(thread => {
            thread.update({
                    timeStamp: Sequelize.fn('NOW'),
                })
                .then(data => {
                    res.json(data);
                })
                .catch(error => {
                    console.error('Error:\t', error);
                    res.sendStatus(500);
                })
        })
        .catch(error => {
            console.error('Error:\t', error);
            res.sendStatus(500);
        })
}

module.exports = {
    findAll,
    findOne,
    deleteOne,
    add,
    findNew,
    updateTimestamp
}