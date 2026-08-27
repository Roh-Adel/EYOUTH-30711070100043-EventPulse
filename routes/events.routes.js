const router = require('express').Router();

const { body, param } = require('express-validator');

const validate = require('../middleware/validate');

const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');

const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} = require('../controllers/eventsController');

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of events
 */

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event MongoDB ID
 *     responses:
 *       200:
 *         description: Event details
 *       404:
 *         description: Event not found
 */

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - category
 *               - date
 *               - capacity
 *             properties:
 *               title:
 *                 type: string
 *                 example: Tech Conference 2026
 *               category:
 *                 type: string
 *                 example: 64f123456789abcdef123456
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-10-15T10:00:00Z
 *               capacity:
 *                 type: number
 *                 example: 100
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin role required
 */

/**
 * @swagger
 * /api/events/{id}:
 *   patch:
 *     summary: Update an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event MongoDB ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Tech Conference
 *               category:
 *                 type: string
 *                 example: 64f123456789abcdef123456
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-11-15T10:00:00Z
 *               capacity:
 *                 type: number
 *                 example: 150
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       400:
 *         description: Invalid event ID or validation error
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin role required
 *       404:
 *         description: Event not found
 */

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event MongoDB ID
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin role required
 *       404:
 *         description: Event not found
 */

// Public routes
router.get('/', getEvents);
router.get('/:id', getEventById);

// Admin only routes
router.post(
  '/',
  [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Title is required'),

    body('category')
      .isMongoId()
      .withMessage('Category must be a valid MongoId'),

    body('date')
      .isISO8601()
      .withMessage('Date must be a valid date'),

    body('capacity')
      .isFloat({ gt: 0 })
      .withMessage('Capacity must be a positive number')
  ],
  validate,
  requireAuth,
  requireRole('admin'),
  createEvent
);

router.patch(
  '/:id',
  [
    param('id')
      .isMongoId()
      .withMessage('Event ID must be a valid MongoId')
  ],
  validate,
  requireAuth,
  requireRole('admin'),
  updateEvent
);

router.delete(
  '/:id',
  requireAuth,
  requireRole('admin'),
  deleteEvent
);

module.exports = router;