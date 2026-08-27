const router = require('express').Router();

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
router.post('/', requireAuth, requireRole('admin'), createEvent);

router.patch('/:id', requireAuth, requireRole('admin'), updateEvent);

router.delete('/:id', requireAuth, requireRole('admin'), deleteEvent);

module.exports = router;