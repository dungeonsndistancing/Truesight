const jwt = require("jsonwebtoken")
const User = require("../model/user")
module.exports = async (req, res, next) => {
    try  {
        console.log("VALIDATING")
        const token = req.headers.token
        const decoded = await jwt.verify(token, "secret");
        const secondsSinceEpoch = Math.round(Date.now() / 1000)  
        if(secondsSinceEpoch - decoded.iat >= 604800) {
            console.log("Connection no longer valid")
            //remove the token from the database anyway
            await User.removeToken(decoded.email, req.headers.token)
            //inform the client the connection has timed out
            res.status(401).json({message:"Connection timed out"})
        } else {
            req.userData = decoded;
            console.log("VALIDATED")
            next()
        }
    } catch (err) {
        console.log("VALIDATION FAILED")
        res.status(401).json({
            message: "Authentication Failed"
        })
    }
}