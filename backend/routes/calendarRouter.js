const express = require('express');
const routes = express.Router();
const calendarController = require("../controllers/calendarController");

// Rota
routes.post("/calendar", calendarController.calendario);
routes.post("/altCalendar", calendarController.alterarCalendario);

// Exportar
module.exports = routes;