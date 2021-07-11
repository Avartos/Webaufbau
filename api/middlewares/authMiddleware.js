const {
    verify
} = require("jsonwebtoken");

/**
 * Checks, if the user is logged in
 * If the user is logged in the actual controller method gets called
 * If the user is not logged in the request is rejected
 */
const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if (!accessToken) {
        res.sendStatus(403);
    }

    try {
        verify(accessToken, "i677hf8kuah2basb0fasjb234faksbf", (err, decodedToken) => {
            req.user = decodedToken;
            if (decodedToken) {
                next();
            } else {
                res.sendStatus(403);
            }
        })
    } catch (err) {
        res.sendStatus(403);
    }
};

/**
 * Checks, if an access token is available and extracts the username
 */
const extractUserFromToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    try {
        verify(accessToken, "i677hf8kuah2basb0fasjb234faksbf", (err, decodedToken) => {
            req.user = decodedToken;
            next();
        })
    } catch (error) {
        console.error('Error:', error);
        res.sendStatus(500);
    }


}

module.exports = {
    validateToken,
    extractUserFromToken
};