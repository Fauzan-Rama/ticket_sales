/** load library express */
const express = require('express')
const app = express()

/** load user's controller */
const userController = require('../controllers/user.controller')

/** load function from auth-controller */
const { authorize } = require('../controllers/auth.controller')

/** load function from role-validation */
const { IsUser, IsAdmin } = require('../middlewares/role-validation')

// --- ROUTE LIST ---

/** create route to get data with method "GET" */
app.get("/", authorize, IsAdmin, userController.getAllUser)

/** create route to find user */
app.get("/:key", authorize, IsAdmin, userController.findUser)

/** create route to add new user using method "POST" */
app.post("/", authorize, IsAdmin, userController.addUser)

/** create route to update user */
app.put("/:id", authorize, IsAdmin, userController.updateUser)

/** create route to delete user */
app.delete("/:id", authorize, IsAdmin, userController.deleteUser)

/** create route to reset password user */
app.put("/reset/:id", userController.resetpassword)

/** export app in order to load in another file */
module.exports = app