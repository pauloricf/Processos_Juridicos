// Importando as libs
const { PrismaClient } = require("@prisma/client");
// const { connect } = require("../routes/processRouter");
const prisma = new PrismaClient();

// Função que faz o histórico de transferência
async function transferencia(req, res) {
    // Dados recebidos 
    console.log(req.body);

    // Atributos
    const {Tran_Motivo, Tran_UsuarioOrigem_id, Tran_ProcuradorDestino_id, Tran_NumeroProcesso_id} = req.body;

    try{
        // Atributos que não podem ser vazios
        if(!Tran_Motivo || !Tran_UsuarioOrigem_id || !Tran_NumeroProcesso_id || !Tran_ProcuradorDestino_id){
            res.json({error : "Não é possível realizar a transferência porque há dados faltantes"})
         
        } else{

            // Objeto para criar o Usuário
            const novaTransferencia = await prisma.transferencias.create({
                data: {
                    Tran_Data: new Date(),
                    Tran_NumeroProcesso_id,
                    Tran_UsuarioOrigem_id,
                    Tran_ProcuradorDestino_id,
                    Tran_Motivo 
                }
            })

            // Atualiza o procurador que vai ficar com o processo
            const processo_para_procurador = await prisma.processos.update({
                where: {
                    id: Tran_NumeroProcesso_id,
                },
                data: {
                    Pcss_Procurador_id: Tran_ProcuradorDestino_id
                }
            })

            // Resposta
            res.status(200).json({novaTransferencia, processo_para_procurador});

        }

    } catch {
        // Mensagem de erro
        res.status(500).json({ error : 'Erro ao criar o processo'});
    }
}

// Exportar funções
module.exports = {
    transferencia,
};