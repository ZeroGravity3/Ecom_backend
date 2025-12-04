/**
 * This is the starting file of the project
 */
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const server_config = require("./config/server.config")
const db_config = require("./config/db.config")
const user_model = require("./models/user.model")
const bcrypt = require("bcryptjs")

app.use(express.json());

/**
 * create the admin user at the starting of the application
 * if not already present
 */

//connection with mongodb
mongoose.connect(db_config.DB_URL);
const db = mongoose.connection
db.on("error", () => {
    console.log('Error while connecting to the mongoDB')
})

db.once("open", () => {
    console.log("Connected to MongoDB")
    init()
})

async function init() {
    try {
        let user = user_model.findOne({ userId: "admin" })

        if (user) {
            console.log("Admin is already present")
            return
        }

    } catch (err) {
        console.log("Error while reading the date", err)
    }



    try {
        user = await user_model.create({
            name: "Vishwa",
            userId: "Admin",
            email: "zerogravity@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("Welcome", 8)
        })
        console.log("Admin created", user);

    } catch (err) {
        console.log("Error while creating Admin", err)

    }
}

require("./routes/auth.routes")(app)
require("./routes/category.routes")(app)

/**
 * Start the server
 */
app.listen(server_config.PORT, () => {
    console.log("Server is running on port num: ", server_config.PORT)
})