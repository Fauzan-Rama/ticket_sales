const express = require('express');
const app = express();

const eventController = require('../controllers/event.controller');
const { authorize } = require('../controllers/auth.controller');
const { IsAdmin } = require('../middlewares/role-validation');

// 1. Get all events
app.get("/", authorize, eventController.getAllEvent);

// 2. Search / Filter events (Tambahkan prefix /search/ agar tidak bentrok dengan ID)
app.get("/search/:key", authorize, eventController.findEvent);

// 3. Get single event by ID
app.get("/:id", authorize, eventController.getEventByID);

// 4. Add new event (Admin only)
app.post("/", authorize, IsAdmin, eventController.addEvent);

// 5. Update event (Admin only)
app.put("/:id", authorize, IsAdmin, eventController.updateEvent);

// 6. Delete event (Admin only)
app.delete("/:id", authorize, IsAdmin, eventController.deleteEvent);

module.exports = app;