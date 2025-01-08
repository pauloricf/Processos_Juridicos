// Importando as libs
const { PrismaClient } = require("@prisma/client");
// const { connect } = require("../routes/processRouter");
const prisma = new PrismaClient();

// Adcionar licenças
async function licenses(req, res) {
    // Dados recebidos 
    console.log(req.body);

    // Atributos
    const {Lice_Motivo, Lice_DataFim, Lice_Usuario_id} = req.body;
    
    try{
        // Atributos que não podem ser vazios
        if(!Lice_DataFim || !Lice_Motivo || !Lice_Usuario_id){
            res.json({error : "Não é possível fazer a licença do usuário porque há dados faltantes"});
        
        } else{
            // Objeto para criar a licença
            const novaLicenca = await prisma.licencas.create({
                data: {
                    Lice_Motivo,
                    Lice_DataFim,
                    Lice_DataInicio: new Date(),
                    Lice_Usuario_id
                }
            });

            // Resposta
            res.status(200).json(novaLicenca);
        }
        
    } catch{
        // Mensagem de erro
        res.status(500).json({ error : 'Erro ao criar a licença.'});
    }

}

async function getLicenses(req, res) {
    try{
        // Pegando as datas cadastradas
        const licencas = await prisma.licencas.findMany();
        res.status(200).json(licencas);

    } catch (error){
        // Mensagem de erro
        res.status(500).json({ error : 'Erro as licenças'});
    }
}

// Exportar funções
module.exports = {
    licenses,
    getLicenses
}