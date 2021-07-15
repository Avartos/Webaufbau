const sequelize = require('../config/connection');
const Rating = require('../models/rating');

const findAll = (req, res) => {
    Rating.findAll()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error('Error:\t', error);
            res.sendStatus(500);
        })
}

const findOne = (req, res) => {
    const ratingId = req.params.id;
    Rating.findByPk(ratingId)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error('Error:\t', error)
            res.sendStatus(500);
        });
}

const updateRating = (req, res) => {
    const userId = req.user.id;
    const contributionId = req.params.id;
    const rating = req.body.rating;

    Rating.findOne({
            where: {
                usersId: userId,
                contributionsId: contributionId
            }
        })
        .then(data => {
            if (data) {
                const newRating = Math.min(Math.max(data.dataValues.rating+rating, -1), 1)
                data.update({
                        rating: newRating
                    })

                    .then(data => {
                        res.sendStatus(200)
                    })
            } else {
                Rating.create({
                        usersId: userId,
                        contributionsId: contributionId,
                        rating: rating
                    })
                    .then(
                        newRating => res.sendStatus(200)
                    );
            }
        })
        .catch(error => {
            res.sendStatus(500);
        })
}


module.exports = {
    findAll,
    findOne,
    updateRating
}