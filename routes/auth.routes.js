/**
 * post localhost:8888/ecomm/api/auth/signup
 * 
 * needs to intercept this
 */
const authController = require("../coontrollers/auth.controllers")
module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/signup", authController.signup)
}