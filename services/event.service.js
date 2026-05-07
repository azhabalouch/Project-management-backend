const AppError = require('../utils/AppError');

class EventService {
  constructor(db) {
    this.db = db; // Injected dependency
  }

  async createEvent(userId, eventData) {
    const eventsRef = this.db.collection('users').doc(userId).collection('events');
    
    const newEvent = {
      ...eventData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await eventsRef.add(newEvent);
    return { id: docRef.id, ...newEvent };
  }

  async getEventById(userId, eventId) {
    const eventRef = this.db.collection('users').doc(userId).collection('events').doc(eventId);
    
    const eventDoc = await eventRef.get();
    if (!eventDoc.exists) {
      throw new AppError('Event not found', 404);
    }

    return { id: eventDoc.id, ...eventDoc.data() };
  }

  async getAllEvents(userId) {
    const eventsRef = this.db.collection('users').doc(userId).collection('events');
    
    const snapshot = await eventsRef.get();
    const events = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return events;
  }

  async updateEvent(userId, eventId, updateData) {
    const eventRef = this.db.collection('users').doc(userId).collection('events').doc(eventId);
    
    const eventDoc = await eventRef.get();
    if (!eventDoc.exists) {
      throw new AppError('Event not found', 404);
    }

    const updated = { ...updateData, updatedAt: new Date().toISOString() };
    await eventRef.update(updated);
    
    return { id: eventId, ...eventDoc.data(), ...updated };
  }

  async deleteEvent(userId, eventId) {
    const eventRef = this.db.collection('users').doc(userId).collection('events').doc(eventId);
    
    const eventDoc = await eventRef.get();
    if (!eventDoc.exists) {
      throw new AppError('Event not found', 404);
    }

    await eventRef.delete();
    return { id: eventId };
  }
}

module.exports = EventService;
