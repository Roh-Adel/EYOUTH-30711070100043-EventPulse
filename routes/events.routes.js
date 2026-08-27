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

router.delete('/:id', requireAuth, requireRole('admin'), deleteEvent);

module.exports = router;