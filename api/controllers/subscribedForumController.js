const Sequelize = require('sequelize');
const SubscribedForum = require('../models/subscribedForum');
const Forum = require('../models/forum');
const Thread = require('../models/thread');

const findAll = (req,res) => {
    SubscribedForum.findAll()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('Error:\t', error);
            res.sendStatus(500);
        })
}

const findOne = (req, res) => {
    const SubscribedForumId = req.params.id;
    SubscribedForum.findByPk(SubscribedForumId)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('Error:\t', error)
            res.sendStatus(500);
        });
}

const add = (req, res) => {
    const forumId = req.params.id;
    const userId = (req.user.id) ? req.user.id : -1;
    const newSubscription = SubscribedForum.build({
        usersId: userId,
        forumsId: forumId,
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


const deleteOne = (req, res) => {
    const forumId = req.params.id;
    const userId = (req.user.id) ? req.user.id : -1;
    SubscribedForum.destroy({
        where: {
            usersId: userId,
            forumsId: forumId
        },
    }, ).then(() => {
        res.sendStatus(200);
    }).catch(error => {
        console.error('Error:\t', error);
        res.sendStatus(500);
    });
}

const findNew = (req, res) => {
    const userId = 1;
    SubscribedForum.findAll({
            attributes: [
                'usersId',
                'timeStamp',
                'forumsId',
                [Sequelize.col('forum.title'), 'forumTitle'],
            ],
            where: {
                usersId: userId
            },
            include: [{
                model: Forum,
                as: 'forum',
                attributes: [
                    'id',
                ],
                include: [{
                    model: Thread,
                    as: 'threads',
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
                        model: Forum,
                        as: 'forum'
                    },
                    {
                        model: Thread,
                        as: 'threads'
                    }, 'createdAt', 'desc'
                ]
            ],
        })
        .then(data => {
            const filteredSubscriptions = extractUnreadNotifications(data);
            res.json(filteredSubscriptions);
        })
        .catch(error => {
            console.error('Error:\t', error.message);
            res.sendStatus(500);
        })
}

/**
 * Checks which subscriptions have contributions that are newer than the 
 * @param {*} threadSubscriptions subscriptions with thread and contributions attached
 * @returns thre new notficiations without contributions
 */
 const extractUnreadNotifications = (forumSubscriptions) => {
    let newNotifications = forumSubscriptions.filter(subscription => {
        const lastReadDate = new Date(subscription.dataValues.timeStamp);
        const threads = (subscription.dataValues.forum) ? subscription.dataValues.forum.dataValues.threads : null;
        //check if the thread has any contributions
        if (threads && threads[0] && threads.length > 0) {
            const lastThreadDate = new Date(threads[0].dataValues.createdAt);
            //check if the date of the latest contribution is newer than the last checked timestamp
            if (lastThreadDate.getTime() > lastReadDate.getTime()) {
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
        delete notification.dataValues.forum;
        return notification;
    })
    return newNotifications;
}


module.exports = {
    findAll,
    findOne,
    add,
    deleteOne,
    findNew
}