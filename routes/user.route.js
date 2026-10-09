
/** Load Express */
const express = require('express');
const app = express();

/** Load user controller */
const userController = require('../controllers/user.controller');

/** Load authentication middleware */
const { authorize } = require('../controllers/auth.controller');

/** Load role validation */
const { IsUser, IsAdmin } = require('../middlewares/role-validation');

// GET all users (Admin only)
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     description: Admin access required.
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
app.get('/', authorize, IsAdmin, userController.getAllUser);

// Find user by key (Admin only)
/**
 * @swagger
 * /user/{key}:
 *   get:
 *     summary: Find user by key
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
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
app.get('/:key', authorize, IsAdmin, userController.findUser);

// Add user (Admin only)
/**
 * @swagger
 * /user:
 *   post:
 *     summary: Add a new user
 *     tags: [User]
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
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
app.post('/', authorize, IsAdmin, userController.addUser);

// Update user (Admin only)
/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: User not found
 */
app.put('/:id', authorize, IsAdmin, userController.updateUser);

// Delete user (Admin only)
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
app.delete('/:id', authorize, IsAdmin, userController.deleteUser);

// Reset user password
/**
 * @swagger
 * /user/reset/{id}:
 *   put:
 *     summary: Reset user password
 *     tags: [User]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 */
app.put('/reset/:id', userController.resetpassword);

/** Export app */
module.exports = app;