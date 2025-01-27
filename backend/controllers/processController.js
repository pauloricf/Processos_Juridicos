// Importando as libs
const { PrismaClient } = require("@prisma/client");
// const { connect } = require("../routes/processRouter");
const prisma = new PrismaClient();

// Função para cadastrar processos
async function cadastrarProcesso (req, res) {
    try{
        // Dados recebidos
        // console.log("Dados recebidos:", req.body);

        // Atributos
        const {Pcss_NumeroProcesso, Pcss_Siged,
                Pcss_Observacoes, Pcss_Destino, Pcss_Requerente, 
                Pcss_Requerido, Pcss_DataEmitido, Pcss_DataVencimento, Pass_Assuntos, Pjud_Vara, Pjud_LocalAudiencia,
                Pjud_DataAudiencia, Pjud_Prazo, Pjud_DataIntimacao, categoria, tipo, prazoCorrido} = req.body;

        console.log(req.body)

        const valorAcao = parseFloat(req.body.Pcss_ValorAcao)
        const status = "Emitido"
        // console.log("categoria", categoria)
        let idCategoria = 0;
        if(categoria=="acao_ordinaria"){
            idCategoria = 1
        } else if (categoria=="juizado_especial"){
            idCategoria = 2
        } else if(categoria=="mandado_seguranca"){
            idCategoria = 3
        }
        console.log(idCategoria)
        // Atributos que não podem ser vazios
        if(!Pcss_NumeroProcesso || !Pcss_Siged || !Pcss_Requerente){
            res.json({error : "Não é possível cadastrar o processo porque há dados faltantes"})
            
        } else{ 
            const procurador = await prisma.procuradores.findFirst({
                orderBy: {
                    Processos: {
                        _count: "asc"
                    }
                }
            })
            
            console.log("Procurador selecionado:", procurador);
            // Objeto para criar o processo
            let novoProcesso;
            // Se o tipo for judicial
            if (tipo === "pjud" && categoria !== "outro") {
                novoProcesso = await prisma.processos.create({
                    data: {
                        Pcss_NumeroProcesso,
                        Pcss_Siged,
                        Pcss_ValorAcao: valorAcao,
                        Pcss_DataInicio: new Date(), 
                        Pcss_Status: status,
                        Pcss_Observacoes,
                        Pcss_Destino,
                        Pcss_Requerente,
                        Pcss_Requerido,
                        Pcss_DataEmitido: new Date(Pcss_DataEmitido),
                        Pcss_DataVencimento: new Date(Pcss_DataVencimento), // Usando a data de início do formulário
                        Pcss_Procurador_id: procurador.id,
                        assuntos: {
                            create: Pass_Assuntos.map(assunto => ({
                                Pass_Assunto: assunto,
                            })),
                        },
                        Pcss_TipoPrazo:{
                            connect: {
                                id: idCategoria
                            }
                        },
                        judiciais: {
                            create: {
                                Pjud_Vara,
                                Pjud_LocalAudiencia,
                                Pjud_DataAudiencia: new Date(Pjud_DataAudiencia), // Usando a data de audiência
                                Pjud_DataIntimacao: new Date(Pjud_DataIntimacao), // Usando a data de intimação
                            }
                        }
                    }
                });
            } 

            else if (tipo === "pjud" && categoria === "outro") {
                console.log("prazocorrido?", prazoCorrido)
                const novoTipoPrazo = await prisma.tiposPrazos.create({
                    data:{
                        Tpraz_Tipo: categoria,
                        Tpraz_Dias: 0,
                        Tpraz_Corrido: prazoCorrido
                    }
                })
                console.log("novo tipo prazo", novoTipoPrazo)
                novoProcesso = await prisma.processos.create({
                    data: {
                        Pcss_NumeroProcesso,
                        Pcss_Siged,
                        Pcss_ValorAcao: valorAcao,
                        Pcss_DataInicio: new Date(), 
                        Pcss_Status: status,
                        Pcss_Observacoes,
                        Pcss_Destino,
                        Pcss_Requerente,
                        Pcss_Requerido,
                        Pcss_DataEmitido: new Date(Pcss_DataEmitido),
                        Pcss_DataVencimento: new Date(Pcss_DataVencimento),
                        Pcss_Procurador_id: procurador.id,
                        assuntos: {
                            create: Pass_Assuntos.map(assunto => ({
                                Pass_Assunto: assunto,
                            })),
                        },
                        Pcss_TipoPrazo:{
                            connect: {
                                id: novoTipoPrazo.id
                            }
                        },
                        judiciais: {
                            create: {
                                Pjud_Vara,
                                Pjud_LocalAudiencia,
                                Pjud_DataAudiencia: new Date(Pjud_DataAudiencia), // Usando a data de audiência
                                Pjud_DataIntimacao: new Date(Pjud_DataIntimacao), // Usando a data de intimação
                            }
                        }
                    }
                    
                });
            }
            // Se o tipo for não judicial

            else if (tipo === "pnjud" && categoria !== "outro") {
                console.log("tipo pnjud")
                novoProcesso = await prisma.processos.create({
                    data: {
                        Pcss_NumeroProcesso,
                        Pcss_Siged,
                        Pcss_ValorAcao: valorAcao,
                        Pcss_DataInicio: new Date(), // Usando a data de início do formulário
                        Pcss_Status: status,
                        Pcss_Observacoes,
                        Pcss_Destino,
                        Pcss_Requerente,
                        Pcss_Requerido,
                        Pcss_DataEmitido: new Date(Pcss_DataEmitido),
                        Pcss_DataVencimento: new Date(Pcss_DataVencimento),
                        Pcss_Procuradores:{
                            connect:{
                                id: procurador.id
                            }
                        },
                        assuntos: {
                            create: Pass_Assuntos.map(assunto => ({
                                Pass_Assunto: assunto,
                            })),
                        },
                        Pcss_TipoPrazo:{
                            connect: {
                                id: idCategoria
                            }
                        }
                    }
                    
                });
            }

            // Se o tipo for não judicial e a categoria for "outro"
            
            else if (tipo === "pnjud" && categoria === "outro") {
                console.log("prazocorrido?", prazoCorrido)
                const novoTipoPrazo = await prisma.tiposPrazos.create({
                    data:{
                        Tpraz_Tipo: categoria,
                        Tpraz_Dias: 0,
                        Tpraz_Corrido: prazoCorrido
                    }
                })
                console.log("novo tipo prazo", novoTipoPrazo)
                novoProcesso = await prisma.processos.create({
                    data: {
                        Pcss_NumeroProcesso,
                        Pcss_Siged,
                        Pcss_ValorAcao: valorAcao,
                        Pcss_DataInicio: new Date(), 
                        Pcss_Status: status,
                        Pcss_Observacoes,
                        Pcss_Destino,
                        Pcss_Requerente,
                        Pcss_Requerido,
                        Pcss_DataEmitido: new Date(Pcss_DataEmitido),
                        Pcss_DataVencimento: new Date(Pcss_DataVencimento),
                        Pcss_Procuradores: procurador.id,
                        assuntos: {
                            create: Pass_Assuntos.map(assunto => ({
                                Pass_Assunto: assunto,
                            })),
                        },
                        Pcss_TipoPrazo:{
                            connect: {
                                id: novoTipoPrazo.id
                            }
                        }
                    }
                    
                });
            }

   
            console.log("Processo cadastrado com sucesso")

            // Resposta
            res.status(200).json(novoProcesso);
        }

    } catch(error){
            // Mensagem de erro
            console.log("Erro ao criar o processo", error)
            res.status(500).json({ error : 'Erro ao criar o processo'});
    }
    
};

const updateProcess = async(req, res) => {
    try {
        
        const {id} = req.params
        console.log(id)
        const { 
            Pcss_NumeroProcesso, 
            Pcss_Siged, 
            Pcss_ValorAcao, 
            Pcss_DataInicio, 
            Pcss_Status, 
            Pcss_Observacoes, 
            Pcss_Destino, 
            Pcss_Requerente, 
            Pcss_Requerido, 
            Pcss_DataVencimento, 
            Pcss_TipoPrazoId, 
            Pcss_Procurador_id 
        } = req.body;

        const processo = await prisma.processos.update({
            where:{
                id: parseInt(id)
            },
            data:{
                Pcss_NumeroProcesso, 
                Pcss_Siged, 
                Pcss_ValorAcao, 
                Pcss_DataInicio, 
                Pcss_Status, 
                Pcss_Observacoes, 
                Pcss_Destino, 
                Pcss_Requerente, 
                Pcss_Requerido, 
                Pcss_DataVencimento: new Date(Pcss_DataVencimento), 
                Pcss_TipoPrazoId, 
                Pcss_Procurador_id 
            }
        })

        res.status(200).json(processo)
    } catch (error) {
        console.log("Erro ao atualizar status do processo", error)
        res.status(500).json({error: "Erro ao atualizar status do processo"})
    }
}
const getAllProcessos = async(req, res) =>{
    try {
        const processos = await prisma.processos.findMany(
            {
                include: 
                {
                judiciais: true,
                assuntos: true,
                Pcss_TipoPrazo: true,
            },

        }
        )
        res.status(200).json(processos)
    } catch (error) {
        res.status(500).json({error: "Erro ao buscar processos"})
    }
}

const getProcessById =  async(req, res) => {
    const {id} = req.params
    console.log(id)
    try {
        const processo = await prisma.processos.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                judiciais: true,
                assuntos: true,
                Pcss_TipoPrazo: true,
            }
        })
        res.status(200).json(processo)
    } catch (error) {
        res.status(500).json({error: "Erro ao buscar processo"})
    }
}


// Exportar funções
module.exports = {
    cadastrarProcesso,
    getAllProcessos,
    updateProcess,
    getProcessById

};
