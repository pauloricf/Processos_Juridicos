const express = require('express');
const routes = express.Router();
const procMovimentacoesController = require("../controllers/procMovimentacoesController");

// Rota
routes.post("/movimentacoes", procMovimentacoesController.procMovimentacoes);

// Exportar
module.exports = routes;