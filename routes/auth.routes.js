/**
 * post localhost:8888/ecomm/api/auth/signup
 * 
 * needs to intercept this
 */
const authController = require("../controllers/auth.controllers");
const authMW = require("../middlewares/auth.middleware");
module.exports = (app) => {
    app.post("/ecomm/api/v1/auth/signup", [authMW.verifySignUpBody], authController.signup)
    app.post("/ecomm/api/v1/auth/signin", [authMW.verifySignInBody],authController.signin)
}

