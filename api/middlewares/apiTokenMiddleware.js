const ApiToken = require ('../models/apiToken');

/*
This middleware get a token via a query and check if this token is existing in the database.
 */
const validateApiToken =  (req, res, next) => {
    const apiToken = req.query.t;

    ApiToken.findOne({
        where: {apiToken:  apiToken},
    })
        .then(data => {
         if(!data){throw Error('invalid token')};
         next();
        })
        .catch(error => {
            console.error('Error:\t', error);
            res.sendStatus(403);
        })
}

module.exports = {
    validateApiToken,
};