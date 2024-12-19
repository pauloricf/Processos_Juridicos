const express = require('express');
const routes = express.Router();
const licensesController = require("../controllers/licensesController");

// Rota
routes.post("/licenses", licensesController.licencas);

// Exportar
module.exports = routes;