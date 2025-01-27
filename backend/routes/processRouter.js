const express = require('express');
const routes = express.Router();
const processController = require("../controllers/processController") 

// Rota
routes.post("/process", processController.cadastrarProcesso)
routes.get("/process", processController.getAllProcessos)
routes.put("/process/:id", processController.updateProcess)
routes.get("/process/:id", processController.getProcessById)

// Exportar
module.exports = routes;
