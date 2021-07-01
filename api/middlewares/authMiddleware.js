const {
    verify
} = require("jsonwebtoken");

//next
const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if (!accessToken) return res.json({
        error: "User is not logged in!"
    });

    try {
        verify(accessToken, "i677hf8kuah2basb0fasjb234faksbf", (err, decodedToken) => {
            req.user = decodedToken;
            if(decodedToken) {
                next();
            }
        })
    } catch (err) {
        res.json({
            error: err
        })
    }
};

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