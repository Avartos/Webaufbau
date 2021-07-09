const sequelize = require('../config/connection');
const Forum = require('../models/forum');
const Thread = require('../models/thread');
const Contribution = require('../models/contribution');

const getOneThread = (req,res) => {
    const threadId = req.params.id;

    Thread.findByPk(threadId, {
        attributes:['title'],
        include: [{
            model: Contribution,
            as: 'contributions',
            where: {threadsId: threadId},
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

const getOneForum = (req,res) => {
    const forumId = req.params.id;

    Thread.count({
        group: ['forumsId'],
        where: {forumsId: forumId}
    })
        .then(data => {
            Forum.findByPk(forumId, {
                attributes:['title'],
                include:[{
                    model: Thread,
                    as: 'threads',
                    where: {forumsId: forumId},
                    required: false,
                    attributes:[]
                }],
            })
                .then(threadData => {
                    let mappedData = addThreadCountsToData([threadData], data);
                    res.json(mappedData);
                })
                .catch(error => {
                    console.error('Error:\t', error);
                    res.sendStatus(500);
                })
        })
        .catch(error => {
            console.log('Error:\t', error)
            res.sendStatus(500);
        });
}


const addThreadCountsToData = (threads, counts) => {
    const mappedArray = threads.map(entry => {
        let matchingCount = counts.find(countEntry => entry.id === countEntry.threadsId);
        if (matchingCount) {
            entry.dataValues.threadCount = matchingCount.count;
        } else {
            entry.dataValues.threadCount = 0;
        }
        return entry;
    });
    return mappedArray;
}

module.exports = {
    getOneThread,
    getOneForum
}