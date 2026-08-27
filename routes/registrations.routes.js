const router = require('express').Router();

const requireAuth = require('../middleware/requireAuth');

const {
  registerForEvent,
  getMyRegistrations,
  cancelRegistration
} = require('../controllers/registrations.controller');

// Register for an event
router.post(
  '/',
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