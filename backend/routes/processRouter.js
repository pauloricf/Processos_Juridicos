const express = require('express');
const routes = express.Router();
const processController = require("../controllers/processController") 

// Rota
routes.post("/processo", processController.cadastrarProcesso)
routes.get("/processo", processController.getAllProcessos)

// Exportar
module.exports = routes;
