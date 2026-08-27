require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoSanitize = require('@exortek/express-mongo-sanitize');

const connectDB = require('./config/db');

require('./models/category.model');
require('./models/user.model');

const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/events.routes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(mongoSanitize());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: 'Route not found'
  });
});

// Error handler - must be last
app.use(errorHandler);

async function start() {
  await connectDB();

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}

start();