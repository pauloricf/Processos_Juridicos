// Importando as libs
const { PrismaClient } = require("@prisma/client");
// const { connect } = require("../routes/processRouter");
const prisma = new PrismaClient();

// Adcionar licenças
async function calendario(req, res) {
    // Dados recebidos 
    console.log(req.body);

    // Atributos
    const {Cale_Data, Cale_DiaSemana, Cale_TipoData} = req.body;

    try{
        // Atributos que não podem ser vazios
        if(!Cale_Data || !Cale_DiaSemana || !Cale_TipoData){
            res.json({error : "Não é possível inserir a data desejada"});
        
        } else{
            // Objeto para criar a licença
            const novaData = await prisma.calendario.create({
                data: {
                    Cale_Data,
                    Cale_DiaSemana,
                    Cale_TipoData
                }
            });

            // Resposta
            res.status(200).json(novaData);
        }
        
    } catch{
        // Mensagem de erro
        res.status(500).json({ error : 'Erro ao criar a cadastrar a data.'});
    }

}

// Função para alterar o calendário
async function alterarCalendario(req, res) {
    // Dados recebidos 
    console.log(req.body);

    // Atributos
    const {Calt_Data, Calt_Motivo, Calt_Usuario_id} = req.body;
    
    try{
        // Atributos que não podem ser vazios
        if(!Calt_Data || !Calt_Motivo || !Calt_Usuario_id){
            res.json({error : "Não é possível alterar a data desejada"});
        
        } else{
            // Objeto para criar a licença
            const novaAlteracaoData = await prisma.calendarioAlteracoes.create({
                data: {
                    Calt_Data,
                    Calt_Motivo,
                    Calt_Usuario_id
                }
            });

            // Resposta
            res.status(200).json(novaAlteracaoData);
        }
        
    } catch{
        // Mensagem de erro
        res.status(500).json({ error : 'Erro ao alterar a data.'});
    }
}

// Exportar funções
module.exports = {
    calendario,
    alterarCalendario
}