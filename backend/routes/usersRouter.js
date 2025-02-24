const express = require('express');
const routes = express.Router();
const usersController = require("../controllers/usersController") 

// Rota
routes.post("/cadastrarUsua", usersController.registerEmployee);
routes.put("/atualizarUsua/:id", usersController.editEmployee);
routes.get("/obterUsua", usersController.getEmployee);
routes.get("/procuradores", usersController.getAttorneys);
routes.delete("/deleteUsua/:id", usersController.deleteEmployee);

// Exportar
module.exports = routes;