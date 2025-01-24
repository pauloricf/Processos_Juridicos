const express = require('express');
const routes = express.Router();
const calendarController = require("../controllers/calendarController");

// Rota
routes.post("/calendar", calendarController.calendar);
routes.post("/altCalendar", calendarController.updateCalendar);
routes.get("/getDates", calendarController.getCalendar);

// Exportar
module.exports = routes;