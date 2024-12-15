const express = require('express');
const routes = express.Router();
const usersController = require("../controllers/usersController") 

// Rota
routes.post("/cadastrarUsua", usersController.cadastrarFuncionarios)

// Exportar
module.exports = routes;