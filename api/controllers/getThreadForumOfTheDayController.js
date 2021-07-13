const sequelize = require('../config/connection');
const Forum = require('../models/forum');
const Thread = require('../models/thread');
const Contribution = require('../models/contribution');
const Sequelize =  require('sequelize');

const getOneThread = (req,res) => {
    const threadId = req.params.id;

    Contribution.count({
        group:['threadsId'],
        where: {threadsId: threadId}
    })
        .then(data => {
            Thread.findOne({
                attributes:['title'],
                include: [{
                    model: Contribution,
                    as: 'contributions',
                    required: false,
                    attributes:[]
                }],
                order: [sequelize.random()],
            })
                .then(threadData => {
                    let mappedData = addContributionCountsToData([threadData], data);
                    res.json(mappedData);
                })
                .catch(error => {
                    console.log('Error:\t', error)
                    res.sendStatus(500);
                });
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
            Forum.findOne({
                attributes:['title'],
                include:[{
                    model: Thread,
                    as: 'threads',
                    required: false,
                    attributes:[]
                }],
                order: [sequelize.random()],
            })
                .then(forumData => {
                    let mappedData = addThreadCountsToData([forumData], data);
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

const addContributionCountsToData = (threads, contributionCounts) => {
    const mappedArray = threads.map(entry => {
        let matchingCount = contributionCounts.find(countEntry => entry.id === countEntry.contributionsId);
        if (matchingCount) {
            entry.dataValues.contributionCount = matchingCount.count;
        } else {
            entry.dataValues.contributionCount = 0;
        }
        return entry;
    });
    return mappedArray;
}

const addThreadCountsToData = (forums, counts) => {
    const mappedArray = forums.map(entry => {
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