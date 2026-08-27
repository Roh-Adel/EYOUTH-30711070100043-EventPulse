const Message = require('../models/message.model');
const Event = require('../models/event.model');

// POST /api/announcements
async function createAnnouncement(req, res) {
  const { eventId, text } = req.body;

  const senderId = req.user.userId;

  const event = await Event.findById(eventId);

  if (!event) {
    return res.status(404).json({
      status: 'fail',
      message: 'Event not found'
    });
  }

  const message = await Message.create({
    event: eventId,
    sender: senderId,
    text
  });

  const io = req.app.get('io');

  io.to(eventId).emit('announcement', message);

  res.status(201).json({
    status: 'success',
    data: message
  });
}

// GET /api/announcements/:eventId
async function getAnnouncements(req, res) {
  const { eventId } = req.params;

  const messages = await Message.find({ event: eventId })
    .populate('sender', 'name email')
    .sort({ createdAt: 1 });

  res.status(200).json({
    status: 'success',
    data: messages
  });
}

module.exports = {
  createAnnouncement,
  getAnnouncements
};