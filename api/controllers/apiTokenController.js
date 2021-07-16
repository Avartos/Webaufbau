const ApiToken = require('../models/apiToken');
/*
This controller will create and save a new generated token in the databse.
 */
const {
    v1: uuidv1,
} = require('uuid');

const add = (req, res) => {

    /*
    the uuidv1 is a function of a framework and generate a random token
     */
    const apiToken = uuidv1();

    /*
    this part save the new token and send it back to the frontend as a json
     */
    ApiToken.create({
            apiToken: apiToken
        })
        .then(data => {
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