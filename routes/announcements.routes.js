const router = require('express').Router();

const { body, param } = require('express-validator');

const validate = require('../middleware/validate');

const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');

const {
  createAnnouncement,
  getAnnouncements
} = require('../controllers/announcements.controller');

// Admin only - Create announcement
router.post(
  '/',
  [
    body('eventId')
      .isMongoId()
      .withMessage('Event ID must be a valid MongoId'),

    body('text')
      .trim()
      .notEmpty()
      .withMessage('Announcement text is required')
  ],
  validate,
  requireAuth,
  requireRole('admin'),
  createAnnouncement
);

// Public - Get announcement history
router.get(
  '/:eventId',
  [
    param('eventId')
      .isMongoId()
      .withMessage('Event ID must be a valid MongoId')
  ],
  validate,
  getAnnouncements
);

module.exports = router;