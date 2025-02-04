const express = require('express');
const routes = express.Router();
const usersController = require("../controllers/usersController") 

// Rota
routes.post("/cadastrarUsua", usersController.registerEmployee);
routes.put("/atualizarUsua/:id", usersController.editEmployee);
routes.get("/obterUsua", usersController.getEmployee);
routes.get("/procuradores", usersController.getAttorneys);

// Exportar
module.exports = routes;