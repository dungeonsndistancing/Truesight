const jwt = require("jsonwebtoken")
const User = require("../model/user")
module.exports = async (req, res, next) => {
    console.log("VALIDATING")
    //retrieve possible tokens
    const token = req.headers.token
    try  {
        //check if a token exists
        if(!token) {
            console.log("no tokens")
            throw new Error("no valid tokens present")
        } else {
            //decode the token
            const decoded = await jwt.verify(token, process.env.SECRET);
            const secondsSinceEpoch = Math.round(Date.now() / 1000)  
            //determine if the token has timed out
            if(secondsSinceEpoch - decoded.iat >= process.env.TOKEN_TIMEOUT) {
                console.log("Connection no longer valid")
                //remove the token from the database anyway
                await User.removeToken(decoded.email, req.headers.token)
                //inform the client the connection has timed out and it should send a longtoken or reconnect
                res.status(401).json("Connection timed out")
                res.send()
            } else {
                req.userData = decoded;
                console.log("VALIDATED")
                next()
            }
        }
    } catch (err) {
        console.log("VALIDATION FAILED")
        res.status(401).json("Authentication Failed")
    }
}
