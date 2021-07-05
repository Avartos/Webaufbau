const Sequelize = require('../config/connection');
const Contribution = require('../models/contribution');
const User = require('../models/user');
const Rating = require('../models/rating');

//basic condition for contribution search


const contributionCondition = (offset, userId) => {
    return {
        attributes: [
            [Sequelize.col('user.userName'), 'creatorUserName'],
            [Sequelize.col('user.id'), 'creatorId'],
            'content',
            'id',
            'threadsId',
            [Sequelize.fn('date_format', Sequelize.col('contribution.createdAt'), '%d.%m.%Y'), 'createdAt'],
            [Sequelize.fn('date_format', Sequelize.col('contribution.updatedAt'), '%d.%m.%Y'), 'updatedAt'],
        ],
        include: [{
                model: User,
                as: 'user',
                attributes: []
            },
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

    console.log(condition);

    Rating.findAll({
            attributes: [
                'contributionsId',
                [Sequelize.fn('sum', Sequelize.col('rating')), 'actualRating'],
            ],
            group: ['contributionsId'],
        })
        .then(ratingData => {
            Contribution.findAll(condition)
                .then(contributionData => {
                    const data = addRatingsToContributions(contributionData, ratingData);
                    res.json(data);
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
        ...contributionCondition(0, 1)
    };
    Rating.findAll({
            attributes: [
                'contributionsId',
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

const update = (req, res) => {
    const contribution = req.body;
    Contribution.update(contribution)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error('Error:\t', error);
            res.sendStatus(500);
        });
}

/**
 * UThis function is used to map the found contribution counts to the threads
 * @param {*} threads
 * @param {*} dataCounts 
 * @returns 
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

module.exports = {
    findAll,
    findOne,
    deleteOne,
    update
}