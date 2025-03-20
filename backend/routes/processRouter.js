const express = require("express");
const routes = express.Router();
const processController = require("../controllers/processController");
const { verify } = require("../middlewares/verifyToken");

// Rota
routes.post("/process", verify, processController.cadastrarProcesso);
routes.get("/process", verify, processController.getAllProcessos);
routes.put("/process/:id", verify, processController.updateProcess);
routes.get("/process/:id", verify, processController.getProcessById);
routes.get("/attorneys/:id/processes/", verify, processController.getProcessesByAttorney);
routes.delete("/process/:id", processController.deleteProcess)

// Exportar
module.exports = routes;
