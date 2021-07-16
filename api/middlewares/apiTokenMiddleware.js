const ApiToken = require ('../models/apiToken');

/**
 * Checks if the user provided a valid api token
 * rejects the request, if the token was either invalid or missing
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