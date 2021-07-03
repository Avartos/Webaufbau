const Sequelize = require('../config/connection');
const Contribution = require('../models/contribution');
const User = require('../models/user');
const Rating = require('../models/rating');

//basic condition for contribution search
const contributionCondition = (offset) => {
    return {
        attributes: [
            [Sequelize.col('user.userName'), 'creatorUserName'],
            [Sequelize.col('user.id'), 'creatorId'],
            [Sequelize.fn('sum', Sequelize.col('ratings.rating')), 'actualRating'],
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
        }, {
            model: Rating,
            as: 'ratings',
            attributes: ['rating'],
            required: false,
        }],
        group: ['id'],
        offset: parseInt(offset),
        includeIgnoreAttributes: false,
    }
}

const findAll = (req, res) => {
    const threadId = req.params.threadId;
    const limit = isNaN(req.query.limit) ? 0 : req.query.limit;
    const offset = isNaN(req.query.offset) ? 0 : req.query.offset;
    const sortBy = (req.query.sortBy) ? req.query.sortBy : null;
    const sortOrder = (req.query.order === 'desc') ? 'desc' : 'asc';
    let condition = {
        ...contributionCondition(offset)
    };
    condition.where = {
        'threadsId': threadId
    };


    //check if the result should be limited
    if (limit > 0) {
        //TODO: check why limit breaks query
        // condition.limit = parseInt(limit);
    }

    //check if the result should be sorted
    if (sortBy) {
        condition.order = [
            [sortBy, sortOrder],
        ];
    }

    console.log(condition);

    Contribution.findAll(condition)
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            console.error("Error:\t", error);
            res.sendStatus(500);
        });
}

const findOne = (req, res) => {
    const id = req.params.id;
    let condition = {
        ...contributionCondition
    };

    Contribution.findByPk(id, condition)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.senStatus(500);
            console.error('Error:\t', error);
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

module.exports = {
    findAll,
    findOne,
    deleteOne,
    update
}