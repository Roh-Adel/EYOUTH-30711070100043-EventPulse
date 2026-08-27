require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoSanitize = require('@exortek/express-mongo-sanitize');
const http = require('http');
const { Server } = require('socket.io');

const connectDB = require('./config/db');

require('./models/category.model');
require('./models/user.model');

const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/events.routes');
const registrationRoutes = require('./routes/registrations.routes');
const announcementRoutes = require('./routes/announcements.routes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(mongoSanitize());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/announcements', announcementRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: 'Route not found'
  });
});

// Error handler - must be last
app.use(errorHandler);

// Create HTTP server
const httpServer = http.createServer(app);

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Make io available to Express controllers
app.set('io', io);

// Socket.IO connection
io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // Join event room
  socket.on('join-event', (eventId) => {
    socket.join(eventId);
    console.log(`Socket ${socket.id} joined event room: ${eventId}`);
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

async function start() {
  await connectDB();

  httpServer.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}

if (require.main === module) {
  start();
}

module.exports = app;