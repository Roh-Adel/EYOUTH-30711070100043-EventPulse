const router = require('express').Router();

const { body } = require('express-validator');

const validate = require('../middleware/validate');

const requireAuth = require('../middleware/requireAuth');

const {
  registerForEvent,
  getMyRegistrations,
  cancelRegistration
} = require('../controllers/registrations.controller');

// Register for an event
router.post(
  '/',
  [
    body('eventId')
      .isMongoId()
      .withMessage('Event ID must be a valid MongoId')
  ],
  validate,
  requireAuth,
  registerForEvent
);

// Get my registrations
router.get(
  '/my',
  requireAuth,
  getMyRegistrations
);

// Cancel my registration
router.delete(
  '/:id',
  requireAuth,
  cancelRegistration
);

module.exports = router;