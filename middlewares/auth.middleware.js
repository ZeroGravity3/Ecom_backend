const user_model = require("../models/user.model")


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

module.exports = {
    verifySignUpBody: verifySignUpBody
}