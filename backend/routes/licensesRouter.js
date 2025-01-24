const express = require('express');
const routes = express.Router();
const licensesController = require("../controllers/licensesController");

// Rota
routes.post("/licenses", licensesController.licenses);
routes.get("/getLicenses", licensesController.getLicenses);

// Exportar
module.exports = routes;