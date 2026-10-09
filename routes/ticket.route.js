const express = require('express');
const app = express();

const ticketController = require('../controllers/ticket.controller');
const { authorize } = require('../controllers/auth.controller');

app.post("/", authorize, ticketController.addTicket);
app.get("/", authorize, ticketController.getAllTicket);

// Route Baru Tugas Praktikum
app.get("/my-tickets", authorize, ticketController.getMyTickets);
app.get("/sales-per-event", authorize, ticketController.getSalesPerEvent);
app.get("/top5-events", authorize, ticketController.getTop5ActiveEvents);

// Route By ID
app.get("/:id", authorize, ticketController.TicketByID);
app.get("/event/:id", authorize, ticketController.TicketByeventID);
app.get("/userID/:id", authorize, ticketController.ticketByuserID);

module.exports = app;