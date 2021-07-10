const Sequelize = require('../config/connection');
const Thread = require('../models/thread');
const User = require('../models/user');
const SubscribedThread = require('../models/subscribedThread');
const Forum = require('../models/forum');
const SubscribedForum = require('../models/subscribedForum');


const findFavorites = (req, res) =>  {
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

module.exports = {
    findFavorites
}