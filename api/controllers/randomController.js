const sequelize = require('../config/connection');
const Forum = require('../models/forum');
const Thread = require('../models/thread');
const Contribution = require('../models/contribution');
const Sequelize = require('sequelize');

// returns a random thread
const getOneThread = (req, res) => {
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

//returns a random forum
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

/**
 * used to add contribution counts to the given threads
 * @param {*} threads               the threads that should be enhanced by counts
 * @param {*} contributionCounts    the corresponding contribution counts
 * @returns                         mapped thread array where each thread includes the number of contributions
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

/**
 * used to add counts to the given forums
 * @param {*} forums  the forums array that should be mapped
 * @param {*} counts  the counts array that should be mapped to the forums
 * @returns mapped forums array where each forum has the corresponding number of threads as value
 */
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