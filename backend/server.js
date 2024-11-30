// importando bibliotecas
const express = require('express');
const cors = require('cors');
const app = express();
const cadastrarProcessos_Routers = require("./routes/processosRouter")

// Usando Cors para permitir requisições de qualquer origem 
app.use(cors());

// Restando da configuração com o servidor
app.use(express.json());

// Usando as rotas
app.use('/api/', cadastrarProcessos_Routers);

// Inicia o servidor
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});