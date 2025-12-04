const category_controller = require("../controllers/category.controllers");
const authMW= require("../middlewares/auth.middleware")

module.exports = (app)=>{
    app.pos("/ecom/api/v1/categories",[authMW.verifyToken, authMW.isAdmin], category_controller.createCategory )
}