const router = require('express').Router();

const {
  createAnnouncement,
  getAnnouncements
} = require('../controllers/announcements.controller');

const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');


// Admin only - Create announcement
router.post(
  '/',
  requireAuth,
  requireRole('admin'),
  createAnnouncement
);


// Public - Get announcement history
router.get(
  '/:eventId',
  getAnnouncements
);


module.exports = router;