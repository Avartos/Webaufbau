const sequelize = require('../config/connection');
const Forum = require('../models/forum');
const Thread = require('../models/thread');
const Contribution = require('../models/contribution');
const Sequelize = require('sequelize');

/*
The part "getOneThread" delivers a random thread and the number of the contributions
 */
const getOneThread = (req, res) => {
    const threadId = req.params.id;

    Contribution.count({
            group: ['threadsId'],
        })
        .then(data => {
            console.log(data);
            Thread.findOne({
                    attributes: ['title', 'id',
                        [Sequelize.fn('CONCAT', '/contributions/', Sequelize.col('id')), 'link']
                    ],
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

/*
The part "getOneForum" delivers a random forum and the numbers of threads
 */
const getOneForum = (req, res) => {
    const forumId = req.params.id;

    Thread.count({
            group: ['forumsId'],
        })
        .then(data => {
            console.log(data);
            Forum.findOne({
                    attributes: [
                        'title',
                        'id',
                        [Sequelize.fn('CONCAT', '/threads/', Sequelize.col('id')), 'link']
                    ],
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

/*
The following two function counts the threads/contributions of the random forum/thread and returns the result
 */
const addContributionCountsToData = (threads, contributionCounts) => {
    const mappedArray = threads.map(entry => {
        let matchingCount = contributionCounts.find(countEntry => entry.id === countEntry.threadsId);
        if (matchingCount) {
            entry.dataValues.contributionCount = matchingCount.count;
        } else {
            entry.dataValues.contributionCount = 0;
        }
        delete entry.dataValues.id;
        return entry;
    });
    return mappedArray;
}

const addThreadCountsToData = (forums, counts) => {
    const mappedArray = forums.map(entry => {
        let matchingCount = counts.find(countEntry => entry.id === countEntry.forumsId);
        if (matchingCount) {
            entry.dataValues.threadCount = matchingCount.count;
        } else {
            entry.dataValues.threadCount = 0;
        }
        delete entry.dataValues.id;
        return entry;
    });
    return mappedArray;
}

module.exports = {
    getOneThread,
    getOneForum
}