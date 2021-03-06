const Sequelize = require('sequelize');

const Contribution = require('../models/contribution');
const User = require('../models/user');
const Rating = require('../models/rating');
const Image = require('../models/image');
const Thread = require('../models/thread');


/**
 * returns a basic condition setup for contribution queries
 * @param {*} offset the offset for the limit
 * @param {*} userId the id of the current logged in user
 * @returns 
 */
const contributionCondition = (offset, userId) => {
    return {
        attributes: [
            [Sequelize.col('user.userName'), 'creatorUserName'],
            [Sequelize.col('user.id'), 'creatorId'],
            'content',
            'id',
            'threadsId',
            //formattings for the dates that are fetched from the database
            [Sequelize.fn('date_format', Sequelize.col('contribution.createdAt'), '%d.%m.%Y'), 'createdAt'],
            [Sequelize.fn('date_format', Sequelize.col('contribution.updatedAt'), '%d.%m.%Y'), 'updatedAt'],
            [Sequelize.col('user.image.profilePicturePath'), 'picturePath'],
        ],
        include: [{
                model: User,
                as: 'user',
                //to include the user without any attributes listed
                attributes: [],
                include: [{
                    model: Image,
                    as: 'image'
                }]
            },
            {
                model: Rating,
                as: 'ratings',
                required: false,
                attributes: ['rating'],
                where: {
                    usersId: userId
                },
                duplicating: false
            }
        ],
        offset: parseInt(offset),
    }
}

const findAll = (req, res) => {
    const threadId = req.params.threadId;
    const limit = isNaN(req.query.limit) ? 0 : req.query.limit;
    const offset = isNaN(req.query.offset) ? 0 : req.query.offset;
    const orderBy = (req.query.orderBy) ? req.query.orderBy : null;
    const sortOrder = (req.query.order === 'desc') ? 'desc' : 'asc';
    const userId = (req.user) ? req.user.id : null;
    const user = req.user;
    let condition = {
        ...contributionCondition(offset, userId)
    };


    condition.where = {
        'threadsId': threadId
    };

    //check if the result should be limited
    if (limit > 0) {
        condition.limit = parseInt(limit);
    }

    //check if the result should be sorted
    if (orderBy) {
        condition.order = [
            [orderBy, sortOrder],
        ];
    }

    //find all ratings first to map them to the contribution
    Rating.findAll({
            attributes: [
                'contributionsId',
                //the sum of all ratings thet belong to a contribution
                [Sequelize.fn('sum', Sequelize.col('rating')), 'actualRating'],
            ],
            group: ['contributionsId'],
        })
        .then(ratingData => {
            Contribution.findAll(condition)
                .then(contributionData => {
                    const data = addRatingsToContributions(contributionData, ratingData);
                    const mappedContributions = addVisibilityLevelToContributions(data, user);
                    res.json(mappedContributions);
                })
                .catch(error => {
                    console.error("Error:\t", error);
                    res.sendStatus(500);
                });
        })
        .catch(error => {
            console.error('Error:', error);
        })
}

const findOne = (req, res) => {
    const id = req.params.id;
    const userId = (req.user) ? req.user.id : null;
    let condition = {
        ...contributionCondition(0, userId)
    };
    //find all ratings first to map them to the contribution
    Rating.findAll({
            attributes: [
                'contributionsId',
                //the sum of all ratings that belong to the contribution
                [Sequelize.fn('sum', Sequelize.col('rating')), 'actualRating'],
            ],
            group: ['contributionsId'],
            where: {
                contributionsId: id
            },
        })
        .then(ratingData => {
            Contribution.findByPk(id, condition)
                .then(contributionData => {
                    if (contributionData) {
                        const dataArray = addRatingsToContributions([contributionData], [...ratingData])
                        const data = (dataArray.length > 0) ? dataArray[0] : null;
                        res.json(data);
                    } else {
                        res.sendStatus(404);
                    }
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

const deleteOne = (req, res) => {
    const id = req.params.id;
    Contribution.destroy({
            where: {
                id: id
            }
        })
        .then(() => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.error('Error:\t', error);
            res.sendStatus(500);
        })
}

/**
 * Adds a new contribution to the given thread id
 */

const add = (req, res) => {
    const threadId = req.params.threadId;
    const contributionText = req.body.contributionText;
    const userId = req.user.id;
    Contribution.create({
            content: contributionText,
            usersId: userId,
            threadsId: parseInt(threadId)
        })
        .then(data => {
            //mark thread as updated, whenever a new contribution gets added
            Thread.findByPk(threadId)
                .then(thread => {
                    thread.changed('updatedAt', true);
                    thread.update({
                            updatedAt: Sequelize.fn('NOW'),
                        })
                        .then(() => {
                            res.json(data);
                        })
                })
        })
        .catch(error => {
            console.error('Error:\t', error);
            res.sendStatus(500);
        });
}




const update = (req, res) => {
    const receivedContribution = req.body;
    const userId = (req.user) ? req.user.id : -1;
    const isAdmin = (req.user) ? req.user.isAdmin : false
    Contribution.findByPk(receivedContribution.id)
        .then(contribution => {
            if (userId !== contribution.usersId && !isAdmin) {
                throw Error(`@user${userId} tried to modify @tcontribution ${receivedContribution.id}`);
            }

            contribution.update({
                    content: receivedContribution.content
                })
                .then((data) => {
                    res.sendStatus(200);
                })
                .catch(error => {
                    res.sendStatus(500);
                    console.error('Error:\t', error);
                })
        })
        .catch(error => {
            res.sendStatus(403);
            console.error('Error:\t', error);
        })
}

/**
 * maps the found ratings to the contributions
 * @param {*} contributions     the array of contributions that should be mapped
 * @param {*} ratings           the array of ratings that should be mapped to the contributions
 * @returns a mapped array of contributions with ratings
 */
const addRatingsToContributions = (contributions, ratings) => {
    const mappedArray = contributions.map(contribution => {
        let matchedRating = ratings.find(rating => contribution.id === rating.contributionsId);
        if (matchedRating) {
            contribution.dataValues.actualRating = parseInt(matchedRating.dataValues.actualRating);
        } else {
            contribution.dataValues.actualRating = 0;
        }
        return contribution;
    });
    return mappedArray;
}

/**
 * Adds visibility levels to all contributions
 * @param {*} contributions a list of threads
 * @param {*} user    the currently logged in user that should be compared with the thread
 * @returns
 */
const addVisibilityLevelToContributions = (contributions, user) => {
    const mappedThreads = contributions.map(contribution => {
        return addVisibilityLevelToContribution(contribution, user);
    });
    return mappedThreads;
}

/**
 * Adds the visibility to one single thread. If the thread has been created by the given user
 * or the user has administrative privileges, the visibility level will be true
 * @param {*} contribution  the thread that should be extended
 * @param {*} user    the user that should be compared
 * @returns
 */
const addVisibilityLevelToContribution = (contribution, user) => {
    if (user && (parseInt(user.id) === parseInt(contribution.dataValues.creatorId) || user.isAdmin)) {

        contribution.dataValues.isEditable = true;
    } else {
        contribution.dataValues.isEditable = false;
    }
    return contribution;
}

module.exports = {
    findAll,
    findOne,
    deleteOne,
    update,
    add
}