const ApiToken = require('../models/apiToken');
const {v1: uuidv1,} = require('uuid');

const add = (req,res) => {

    const apiToken = uuidv1();

    ApiToken.create({
        apiToken: apiToken
    })
        .then(data =>{
            res.json(apiToken)
        })
        .catch(error => {
            console.error('Error:\t', error);
            res.sendStatus(500);
        })
};

module.exports = {
    add,
};