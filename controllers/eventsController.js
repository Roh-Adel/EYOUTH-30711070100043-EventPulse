const Event = require('../models/event.model');

const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

// CREATE EVENT
exports.createEvent = asyncHandler(async (req, res, next) => {
  const {
    title,
    description,
    category,
    date,
    city,
    venue,
    capacity
  } = req.body;

  const event = await Event.create({
    title,
    description,
    category,
    date,
    city,
    venue,
    capacity,
    organizer: req.user.userId
  });

  res.status(201).json({
    status: 'success',
    data: event
  });
});


// GET ALL EVENTS
exports.getEvents = asyncHandler(async (req, res, next) => {
  const {
    category,
    city,
    startDate,
    endDate,
    page,
    limit,
    sortBy,
    order,
    search
  } = req.query;

  const filter = {};

  // Filtering by category
  if (category) {
    filter.category = category;
  }

  // Filtering by city
  if (city) {
    filter.city = city;
  }

  // Filtering by date range
  if (startDate || endDate) {
    filter.date = {};

    if (startDate) {
      filter.date.$gte = new Date(startDate);
    }

    if (endDate) {
      filter.date.$lte = new Date(endDate);
    }
  }

  // Text search
  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: 'i'
        }
      },
      {
        description: {
          $regex: search,
          $options: 'i'
        }
      }
    ];
  }

  // Pagination
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;

  const skip = (pageNum - 1) * limitNum;

  // Safe sorting
  const allowedSortFields = ['date', 'registrations'];

  const sortField = allowedSortFields.includes(sortBy)
    ? sortBy
    : 'date';

  const sortDirection = order === 'desc' ? -1 : 1;

  const sort = {
    [sortField]: sortDirection
  };

  // Get events + total count
  const [data, total] = await Promise.all([
    Event.find(filter)
      .populate('category')
      .populate('organizer')
      .sort(sort)
      .skip(skip)
      .limit(limitNum),

    Event.countDocuments(filter)
  ]);

  const totalPages = Math.ceil(total / limitNum);

  res.status(200).json({
    status: 'success',
    total,
    page: pageNum,
    limit: limitNum,
    totalPages,
    data
  });
});


// GET EVENT BY ID
exports.getEventById = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.id)
    .populate('category')
    .populate('organizer');

  if (!event) {
    return next(new AppError('Event not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: event
  });
});


// UPDATE EVENT
exports.updateEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!event) {
    return next(new AppError('Event not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: event
  });
});


// DELETE EVENT
exports.deleteEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findByIdAndDelete(req.params.id);

  if (!event) {
    return next(new AppError('Event not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: event
  });
});