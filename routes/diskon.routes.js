
const express = require("express");

const router = express.Router();

const diskonController = require("../controllers/diskon.controller");

const { authorize } = require("../controllers/auth.controller");

const { IsAdmin } = require("../middlewares/role-validation");

// const { validateDiskon } = require("../middlewares/diskon-validation");

/**
 * @swagger
 * /diskon:
 *   get:
 *     summary: Get all discounts
 *     tags: [Diskon]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of discounts retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/", authorize, diskonController.getAllDiskon);

/**
 * @swagger
 * /diskon/{key}:
 *   get:
 *     summary: Find a discount by key
 *     tags: [Diskon]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: Discount key
 *     responses:
 *       200:
 *         description: Discount retrieved successfully
 *       404:
 *         description: Discount not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:key", authorize, diskonController.findDiskon);

/**
 * @swagger
 * /diskon:
 *   post:
 *     summary: Add a new discount
 *     tags: [Diskon]
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
 *           example:
 *             key: DISKON10
 *             nominal: 10
 *     responses:
 *       201:
 *         description: Discount created successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.post("/", authorize, IsAdmin, diskonController.addDiskon);

/**
 * @swagger
 * /diskon/{id}:
 *   put:
 *     summary: Update a discount
 *     tags: [Diskon]
 *     security:
 *       - bearerAuth: []
 *     description: Admin access required.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Discount ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Discount updated successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Discount not found
 */
router.put("/:id", authorize, IsAdmin, diskonController.updateDiskon);

/**
 * @swagger
 * /diskon/{id}:
 *   delete:
 *     summary: Delete a discount
 *     tags: [Diskon]
 *     security:
 *       - bearerAuth: []
 *     description: Admin access required.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Discount ID
 *     responses:
 *       200:
 *         description: Discount deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Discount not found
 */
router.delete("/:id", authorize, IsAdmin, diskonController.deleteDiskon);

module.exports = router;