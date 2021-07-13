const ApiToken = require ('../models/apiToken');

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