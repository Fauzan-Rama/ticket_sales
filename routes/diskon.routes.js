
const express = require('express');
const router = express.Router();

const diskonController = require('../controllers/diskon.controller');
const { authorize } = require('../controllers/auth.controller');
const { IsAdmin } = require('../middlewares/role-validation');

// GET all discounts
/**
 * @swagger
 * /diskon:
 *   get:
 *     summary: Get all discounts
 *     tags: [Diskon]
 *     responses:
 *       200:
 *         description: Discounts retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/', authorize, diskonController.getAllDiskon);

// GET discount by key
/**
 * @swagger
 * /diskon/{key}:
 *   get:
 *     summary: Find discount by key
 *     tags: [Diskon]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Discount retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Discount not found
 */
router.get('/:key', authorize, diskonController.findDiskon);

// POST new discount (Admin only)
/**
 * @swagger
 * /diskon:
 *   post:
 *     summary: Add a new discount
 *     tags: [Diskon]
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
 *         description: Discount created successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.post('/', authorize, IsAdmin, diskonController.addDiskon);

// PUT update discount (Admin only)
/**
 * @swagger
 * /diskon/{id}:
 *   put:
 *     summary: Update a discount
 *     tags: [Diskon]
 *     description: Admin access required.
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
 *         description: Discount updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Discount not found
 */
router.put('/:id', authorize, IsAdmin, diskonController.updateDiskon);

// DELETE discount (Admin only)
/**
 * @swagger
 * /diskon/{id}:
 *   delete:
 *     summary: Delete a discount
 *     tags: [Diskon]
 *     description: Admin access required.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
router.delete('/:id', authorize, IsAdmin, diskonController.deleteDiskon);

module.exports = router;