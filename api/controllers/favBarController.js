const Sequelize = require('../config/connection');
const Thread = require('../models/thread');
const User = require('../models/user');
const SubscribedThread = require('../models/subscribedThread');
const Forum = require('../models/forum');
const SubscribedForum = require('../models/subscribedForum');


const findFavorites = (req, res) =>  {
    const userID = 1;
    SubscribedThread.findAll({
        attributes: ['usersId', 'threadsId',
                        [Sequelize.col('thread.title'), 'threadTitle'],
                        [Sequelize.col('thread.forum.title'), 'forumTitle']
                    ],
       where: {usersId: userID},
        include: [{model:Thread,
                    as: 'thread',
                    attributes:[],
        include: [{model:Forum,
                    as: 'forum',
                    attributes:[]}
                    ]}]
    }).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.error("Error:\t",error);
    })

}

module.exports = {
    findFavorites
}