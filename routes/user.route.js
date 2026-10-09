
/** load library express */
const express = require('express');

const app = express();

/** load user's controller */
const userController = require('../controllers/user.controller');

/** load function from auth-controller */
const { authorize } = require('../controllers/auth.controller');

/** load function from role-validation */
const { IsUser, IsAdmin } = require('../middlewares/role-validation');

// --- ROUTE LIST ---

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     description: Admin access required.
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
app.get("/", authorize, IsAdmin, userController.getAllUser);

/**
 * @swagger
 * /user/{key}:
 *   get:
 *     summary: Find a user by key
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     description: Admin access required.
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: User key
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: User not found
 */
app.get("/:key", authorize, IsAdmin, userController.findUser);

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Add a new user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     description: Admin access required.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
app.post("/", authorize, IsAdmin, userController.addUser);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     description: Admin access required.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: User not found
 */
app.put("/:id", authorize, IsAdmin, userController.updateUser);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     description: Admin access required.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: User not found
 */
app.delete("/:id", authorize, IsAdmin, userController.deleteUser);

/**
 * @swagger
 * /user/reset/{id}:
 *   put:
 *     summary: Reset a user's password
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 */
app.put("/reset/:id", userController.resetpassword);

/** export app in order to load in another file */
module.exports = app;