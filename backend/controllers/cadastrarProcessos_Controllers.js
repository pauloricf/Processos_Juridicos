// Importando as libs
const { PrismaClient } = require("@prisma/client");
const { connect } = require("../routes/cadastrarProcessos_Routers");
const prisma = new PrismaClient();

// Função para cadastrar processos
async function post_cadastrarProcesso (req, res) {
    try{
        // Dados recebidos
        console.log("Dados recebidos:", req.body);
        console.log('Valor recebido para Pcss_ValorAcao:', req.body.Pcss_ValorAcao);
        console.log('Tipo do dado:', typeof(req.body.Pcss_ValorAcao));

        // Atributos
        const {Pcss_NumeroProcesso, Pcss_Siged, Pcss_Status, Pcss_Observacoes, Pcss_Destino, Pcss_Requerente, Pcss_Requerido, Pass_Assuntos} = req.body;

        // Mudando o tipo do Pcss_ValorAcao
        Pcss_ValorAcao = parseFloat(req.body.Pcss_ValorAcao)
        //Pcss_ValorAcao = Float32Array(10500)

        // Atributos que não podem ser vazios
        if(!Pcss_NumeroProcesso || !Pcss_Siged || !Pcss_ValorAcao || !Pcss_Requerente){
            res.json({error : "Não é possível cadastrar o processo porque há dados faltantes"})

        } else{ 
            // Objeto para criar o processo
            const novoProcesso = await prisma.processos.create({
            data : {Pcss_NumeroProcesso, Pcss_Siged, Pcss_ValorAcao, Pcss_DataInicio : new Date(), Pcss_Status, Pcss_Observacoes, Pcss_Destino, Pcss_Requerente, Pcss_Requerido,
            assuntos : {connect : assuntos.map(id => ({id}))}   
            }});

            // Resposta
            res.json(novoProcesso);
        }

    } catch{
         // Mensagem de erro
         res.status(500).json({ error : 'Erro ao criar o processo'});
    }
    
};

// Exportar funções
module.exports = {
    post_cadastrarProcesso
};
