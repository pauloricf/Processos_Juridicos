// Importando as libs
const { PrismaClient } = require("@prisma/client");
const { calculateDataVencimento } = require("./deadlineController");
// const { connect } = require("../routes/processRouter");
const prisma = new PrismaClient();

// Função para cadastrar processos
async function cadastrarProcesso(req, res) {
  try {
    // Dados recebidos
    // console.log("Dados recebidos:", req.body);

    // Atributos
    const {
      Pcss_NumeroProcesso,
      Pcss_Siged,
      Pcss_Observacoes,
      Pcss_Destino,
      Pcss_Requerente,
      Pcss_Requerido,
      Pcss_DataEmitido,
      Pass_Assuntos,
      Pjud_Vara,
      Pjud_LocalAudiencia,
      Pjud_DataAudiencia,
      Pjud_Prazo,
      Pjud_DataIntimacao,
      categoria,
      tipo,
      prazoCorrido,
    } = req.body;

    console.log(req.body);

    const valorAcao = parseFloat(req.body.Pcss_ValorAcao);
    const status = "Emitido";
    // console.log("categoria", categoria)
    let idCategoria = 0;
    if (categoria == "acao_ordinaria") {
      idCategoria = 1;
    } else if (categoria == "juizado_especial") {
      idCategoria = 2;
    } else if (categoria == "mandado_seguranca") {
      idCategoria = 3;
    }
    console.log(idCategoria);
    // Atributos que não podem ser vazios
    if (!Pcss_NumeroProcesso || !Pcss_Siged || !Pcss_Requerente) {
      res.json({ error: "Não é possível cadastrar o processo porque há dados faltantes" });
    } else {
      const procurador = await prisma.procuradores.findFirst({
        orderBy: {
          Processos: {
            _count: "asc",
          },
        },
      });

      console.log("Procurador selecionado:", procurador);
      console.log(procurador.id);

      let prazoDias = 0;
      if (idCategoria) {
        const tipoPrazo = await prisma.tiposPrazos.findUnique({
          where: { id: idCategoria },
          select: { Tpraz_Dias: true },
        });
        prazoDias = tipoPrazo?.Tpraz_Dias || 0;
      } else if (categoria === "outro") {
        prazoDias = parseInt(req.body.prazo) || 0;
      }
      // console.log("Prazo corrido", prazoCorrido)
      // console.log("Data de emissao:", Pcss_DataEmitido);
      // console.log("Prazo em dias:", prazoDias);
      // Calcular data de vencimento
      const Pcss_DataVencimento = await calculateDataVencimento(Pcss_DataEmitido, prazoDias, prazoCorrido);
      console.log("Data de vencimento:", Pcss_DataVencimento);

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
            Pcss_Procuradores: {
              connect: {
                id: procurador.id,
              },
            },
            assuntos: {
              create: Pass_Assuntos.map((assunto) => ({
                Pass_Assunto: assunto,
              })),
            },
            Pcss_TipoPrazo: {
              connect: {
                id: idCategoria,
              },
            },
            judiciais: {
              create: {
                Pjud_Vara,
                Pjud_LocalAudiencia,
                Pjud_DataAudiencia: new Date(Pjud_DataAudiencia), // Usando a data de audiência
                Pjud_DataIntimacao: new Date(Pjud_DataIntimacao), // Usando a data de intimação
              },
            },
          },
        });
      } else if (tipo === "pjud" && categoria === "outro") {
        console.log("prazocorrido?", prazoCorrido);
        const novoTipoPrazo = await prisma.tiposPrazos.create({
          data: {
            Tpraz_Tipo: categoria,
            Tpraz_Dias: 0,
            Tpraz_Corrido: prazoCorrido,
          },
        });
        console.log("novo tipo prazo", novoTipoPrazo);
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
            Pcss_Procuradores: {
              connect: {
                id: procurador.id,
              },
            },
            assuntos: {
              create: Pass_Assuntos.map((assunto) => ({
                Pass_Assunto: assunto,
              })),
            },
            Pcss_TipoPrazo: {
              connect: {
                id: novoTipoPrazo.id,
              },
            },
            judiciais: {
              create: {
                Pjud_Vara,
                Pjud_LocalAudiencia,
                Pjud_DataAudiencia: new Date(Pjud_DataAudiencia), // Usando a data de audiência
                Pjud_DataIntimacao: new Date(Pjud_DataIntimacao), // Usando a data de intimação
              },
            },
          },
        });
      }
      // Se o tipo for não judicial
      else if (tipo === "pnjud" && categoria !== "outro") {
        console.log("tipo pnjud");
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
            Pcss_Procuradores: {
              connect: {
                id: procurador.id,
              },
            },
            assuntos: {
              create: Pass_Assuntos.map((assunto) => ({
                Pass_Assunto: assunto,
              })),
            },
            Pcss_TipoPrazo: {
              connect: {
                id: idCategoria,
              },
            },
          },
        });
      }

      // Se o tipo for não judicial e a categoria for "outro"
      else if (tipo === "pnjud" && categoria === "outro") {
        console.log("prazocorrido?", prazoCorrido);
        const novoTipoPrazo = await prisma.tiposPrazos.create({
          data: {
            Tpraz_Tipo: categoria,
            Tpraz_Dias: 0,
            Tpraz_Corrido: prazoCorrido,
          },
        });
        console.log("novo tipo prazo", novoTipoPrazo);
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
            Pcss_Procuradores: {
              connect: {
                id: procurador.id,
              },
            },
            assuntos: {
              create: Pass_Assuntos.map((assunto) => ({
                Pass_Assunto: assunto,
              })),
            },
            Pcss_TipoPrazo: {
              connect: {
                id: novoTipoPrazo.id,
              },
            },
          },
        });
      }

      console.log("Processo cadastrado com sucesso");
      console.log(novoProcesso);

      // Resposta
      res.status(200).json(novoProcesso);
    }
  } catch (error) {
    // Mensagem de erro
    console.log("Erro ao criar o processo", error);
    res.status(500).json({ error: "Erro ao criar o processo" });
  }
}

const updateProcess = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
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
      Pcss_Procurador_id,
    } = req.body;

    const processo = await prisma.processos.update({
      where: {
        id: parseInt(id),
      },
      data: {
        Pcss_NumeroProcesso,
        Pcss_Siged,
        Pcss_ValorAcao,
        Pcss_DataInicio,
        Pcss_Status,
        Pcss_Observacoes,
        Pcss_Destino,
        Pcss_Requerente,
        Pcss_Requerido,
        Pcss_DataVencimento: Pcss_DataVencimento ? new Date(Pcss_DataVencimento) : undefined,
        Pcss_TipoPrazoId,
        Pcss_Procurador_id,
      },
    });

    res.status(200).json(processo);
  } catch (error) {
    console.log("Erro ao atualizar status do processo", error);
    res.status(500).json({ error: "Erro ao atualizar status do processo" });
  }
};
const getAllProcessos = async (req, res) => {
  try {
    const processos = await prisma.processos.findMany({
      include: {
        judiciais: true,
        assuntos: true,
        Pcss_TipoPrazo: true,
      },
    });
    res.status(200).json(processos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar processos" });
  }
};

const getProcessById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const processo = await prisma.processos.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        judiciais: true,
        assuntos: true,
        Pcss_TipoPrazo: true,
      },
    });
    res.status(200).json(processo);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar processo" });
  }
};

const getProcessesByAttorney = async (req, res) => {
  // console.log(req);
  const { id } = req.params;
  try {
    console.log("id", id);
    const procurador = await prisma.procuradores.findFirst({
      where: {
        Pcrd_Usuario_id: parseInt(id), // Encontra o procurador pelo ID do usuário
      },
    });

    if (!procurador) {
      return res.status(404).json({ error: "Procurador não encontrado" });
    }

    // Depois, busca os processos relacionados ao procurador
    const processes = await prisma.processos.findMany({
      where: {
        Pcss_Procurador_id: procurador.id, // Busca processos do procurador encontrado
      },
      include: {
        assuntos: true,
      },
      orderBy: {
        Pcss_DataVencimento: "asc",
      },
    });
    res.status(200).json(processes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao buscar processos do procurador" });
  }
};

const deleteProcess = async (req, res) => {
  const { id } = req.params;
  try {
    const process = await prisma.processos.delete({
      where: {
        id: parseInt(id),
      }
    });
    console.log(process)
    res.status(200).json(process);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao deletar o Processo" });
  }
};
// Exportar funções
module.exports = {
  cadastrarProcesso,
  getAllProcessos,
  updateProcess,
  getProcessById,
  getProcessesByAttorney,
  deleteProcess,
};
