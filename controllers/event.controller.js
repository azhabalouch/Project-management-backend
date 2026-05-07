const EventService = require('../services/event.service');
const { getFirestore } = require('firebase-admin/firestore');

// Instantiate service with the DB
const eventService = new EventService(getFirestore());

// Create a new event
exports.createEvent = async (req, res, next) => {
  try {
    const event = await eventService.createEvent(req.user.uid, req.body);
    res.status(201).json({ status: 'success', data: { event } });
  } catch (error) {
    next(error);
  }
};

// Get all events for the user
exports.getEvents = async (req, res, next) => {
  try {
    const events = await eventService.getAllEvents(req.user.uid);
    res.status(200).json({ status: 'success', data: { events } });
  } catch (error) {
    next(error);
  }
};

// Get a single event by ID
exports.getEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const event = await eventService.getEventById(req.user.uid, eventId);
    res.status(200).json({ status: 'success', data: { event } });
  } catch (error) {
    next(error);
  }
};

// Update an event
exports.updateEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const event = await eventService.updateEvent(req.user.uid, eventId, req.body);
    res.status(200).json({ status: 'success', data: { event } });
  } catch (error) {
    next(error);
  }
};

// Delete an event
exports.deleteEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const result = await eventService.deleteEvent(req.user.uid, eventId);
    res.status(200).json({ status: 'success', message: 'Event deleted successfully', data: result });
  } catch (error) {
    next(error);
  }
};
