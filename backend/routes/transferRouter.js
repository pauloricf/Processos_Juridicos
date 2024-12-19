const express = require('express');
const routes = express.Router();
const transferController = require("../controllers/transferController");

// Rota
routes.post("/transfer", transferController.transferencia);

// Exportar
module.exports = routes;