const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")
const auth_config = require("../config/auth.config")


/**
 * create a mioddleware will check if the request body is working proper and correct
 */
const verifySignUpBody = async (req, res, next) => {
    try {
        // check for the name,
        if (!req.body.name) {
            return res.status(400).send({
                message: "Failed! name is not provided in request body"
            })
        }

        //check for the mail,
        if (!req.body.email) {
            return res.status(400).send({
                message: "Failed! Email is not provided in request body"
            })
        }

        //check for the userId
        if (!req.body.userId) {
            return res.status(400).send({
                message: "Failed! userId is not provided in request body"
            })
        }

        //check if the user with the same userId is already present
        const user = await user_model.findOne({ userId: req.body.userId })

        if (user) {
            return res.status(400).send({
                message: "Failed! userId already exist in request body"
            })
        }

        next()

    } catch (err) {
        console.log("error while validating  the request object", err)
        res.status(500).send({
            messaege: "error wlil validating the request body"
        })

    }
}

const verifySignInBody = async(req, res, next)=>{
    if(!req.body.userId){
        return res.status(400).send({
            message: "userId is not provided"
        })
    }
    if(!req.body.password){
        return res.status(400).send({
            message: "Password is not provided"
        })
    }
     next()
}
const verifyToken = async(req,res,next)=>{

    const token = req.headers["x-access-token"];
    if(!token){
        return res.status(403).send({
            message: "No token found : Unauthorised" 
        })
    }
    jwt.verify(token, auth_config.secret,async (err, decoded)=>{
        if(err){
          return res.status(401).send({
            message: "No token found : Unauthorised"   
        })
    }
    const user = await user_model.findOne({userId: decoded.userId})
    if(!user){
        return res.status(400).send({
            message: "Unauthorised, no user found for this token"
        })
    }
    req.user = user;
    next()
    })
}
const isAdmin = async(req,res,next)=>{
    const user = req.user;
    if(user && user.userType == "ADMIN"){
        next()
    }else{
        return res.status(403).send({
            message: "Only admin can access this endpoint"
        })
    }
}

    

module.exports = {
    verifySignUpBody: verifySignUpBody,
    verifySignInBody: verifySignInBody,
    verifyToken: verifyToken,
    isAdmin: isAdmin
}