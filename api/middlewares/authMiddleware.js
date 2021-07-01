const {verify} = require("jsonwebtoken");

//next
const validateToken = (req,res,next) => {
    const accessToken = req.header("accessToken");

    if (!accessToken) return res.json({error: "User is not logged in!"});

    try{ 
        const validToken = verify(accessToken, "i677hf8kuah2basb0fasjb234faksbf")

        if(validToken){
            return next();
        } 
    } catch (err){
        res.json({error: err})
    }
};

module.exports = {validateToken};