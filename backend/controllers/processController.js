// Importando as libs
const { PrismaClient } = require("@prisma/client");
// const { connect } = require("../routes/processRouter");
const prisma = new PrismaClient();

// Função para cadastrar processos
async function cadastrarProcesso (req, res) {
    try{
        // Dados recebidos
        console.log("Dados recebidos:", req.body);

        // Atributos
        const {Pcss_NumeroProcesso, Pcss_Siged, Pcss_Status, Pcss_Observacoes, Pcss_Destino, Pcss_Requerente, Pcss_Requerido, Pass_Assuntos, Pjud_Vara, Pjud_LocalAudiencia, Pjud_DataAudiencia, Pjud_Prazo, Pjud_DataIntimacao} = req.body;

        // Mudando o tipo do Pcss_ValorAcao
        Pcss_ValorAcao = parseFloat(req.body.Pcss_ValorAcao)

        // Atributos que não podem ser vazios
        if(!Pcss_NumeroProcesso || !Pcss_Siged || !Pcss_ValorAcao || !Pcss_Requerente){
            res.json({error : "Não é possível cadastrar o processo porque há dados faltantes"})

        } else{ 
            // Objeto para criar o processo
            const novoProcesso = await prisma.processos.create({
            data : {Pcss_NumeroProcesso, 
                    Pcss_Siged, 
                    Pcss_ValorAcao, 
                    Pcss_DataInicio : new Date(), 
                    Pcss_Status, 
                    Pcss_Observacoes, 
                    Pcss_Destino, 
                    Pcss_Requerente, 
                    Pcss_Requerido,
                    assuntos: {
                        create: Pass_Assuntos.map(assunto => ({
                          Pass_Assunto: assunto,
                        })),
                    },
                    judiciais: {create: {
                        Pjud_LocalAudiencia: Pjud_LocalAudiencia,
                        Pjud_Vara: Pjud_Vara,
                        Pjud_Prazo: Pjud_Prazo,
                        Pjud_DataAudiencia: Pjud_DataAudiencia,
                        Pjud_DataIntimacao: Pjud_DataIntimacao
                    }}
                    
            }});

            // Resposta
            res.status(200).json(novoProcesso);
        }

    } catch{
         // Mensagem de erro
         res.status(500).json({ error : 'Erro ao criar o processo'});
    }
    
};

const getAllProcessos = async(req, res) =>{
    try {
        const processos = await prisma.processos.findMany(
            {
                include: 
                {
                judiciais: true,
                assuntos: true,
            },
            


        }
        )
        res.status(200).json(processos)
    } catch (error) {
        res.status(500).json({error: "Erro ao buscar processos"})
    }
}

// Exportar funções
module.exports = {
    cadastrarProcesso,
    getAllProcessos
};
