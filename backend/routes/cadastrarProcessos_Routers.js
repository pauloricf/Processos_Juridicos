const express = require('express');
const router = express.Router();
const post_cadastrarProcesso_Controllers = require("../controllers/cadastrarProcessos_Controllers")

// Rota
router.post("/postCadProcessos", post_cadastrarProcesso_Controllers.post_cadastrarProcesso)

// Exportar
module.exports = router;
