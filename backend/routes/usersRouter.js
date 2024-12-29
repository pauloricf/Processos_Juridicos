const express = require('express');
const routes = express.Router();
const usersController = require("../controllers/usersController") 

// Rota
routes.post("/cadastrarUsua", usersController.cadastrarFuncionarios);
routes.put("/atualizarUsua/:id", usersController.editarFuncionarios);
routes.get("/obterUsua", usersController.obterFuncionarios);

// Exportar
module.exports = routes;