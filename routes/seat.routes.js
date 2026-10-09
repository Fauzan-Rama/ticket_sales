const express = require('express');
const app = express();

const seatController = require('../controllers/seat.controller');
const { authorize } = require('../controllers/auth.controller');
const { IsAdmin } = require('../middlewares/role-validation');

app.get("/", authorize, seatController.getAllSeats);
app.get("/:key", authorize, seatController.findSeat);
app.post("/", authorize, IsAdmin, seatController.addSeat);
app.put("/:id", authorize, IsAdmin, seatController.updateSeat);
app.delete("/:id", authorize, IsAdmin, seatController.deleteSeat);
app.get("/event/:eventID", authorize, seatController.getSeatByEvent);
app.put("/status/:id", authorize, seatController.updateSeatStatus);

module.exports = app;