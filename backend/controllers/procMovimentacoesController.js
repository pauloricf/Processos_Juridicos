// Importando as libs
const { PrismaClient } = require("@prisma/client");
// const { connect } = require("../routes/processRouter");
const prisma = new PrismaClient();

// Adcionar licenças
async function procMovimentacoes(req, res) {
    // Dados recebidos 
    console.log(req.body);

    // Atributos
    const {Pmov_Despacho, Pmov_Publicacao, Pmov_Providencia, Pmov_Procuradores_id, Pmov_NumeroProcesso_id} = req.body;
    
    try{
        // Atributos que não podem ser vazios
        if(!Pmov_NumeroProcesso_id){
            res.json({error : "Não é possível fazer a movimentação do processo"});
        
        } else{
            // Objeto para criar a licença
            const novaMovimentacao = await prisma.procMovimentacoes.create({
                data: {
                    Pmov_Data: new Date(),
                    Pmov_Despacho,
                    Pmov_NumeroProcesso_id,
                    Pmov_Procuradores_id,
                    Pmov_Providencia,
                    Pmov_Publicacao
                }
            });

            // Resposta
            res.status(200).json(novaMovimentacao);
        }
        
    } catch{
        // Mensagem de erro
        res.status(500).json({ error : 'Erro ao criar a licença.'});
    }

}

// Exportar funções
module.exports = {
    procMovimentacoes
}