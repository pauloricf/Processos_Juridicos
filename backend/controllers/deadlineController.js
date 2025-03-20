const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const calculateDataVencimento = async (dataEmitido, prazo, prazoCorrido) => {
  const feriados = await prisma.calendarioAlteracoes.findMany({
    where: { Calt_Tipo: "feriado" },
    select: { Calt_Data: true },
  });
  const isDiaUtil = (data) => {
    // const feriados = [];
    const diaSemana = data.getUTCDay();
    // console.log("Dia da semana", diaSemana);
    const dataISO = data.toISOString().split("T")[0];
    return diaSemana !== 0 && diaSemana !== 6 && !feriados.some((f) => f.Calt_Data.toISOString().split("T")[0] === dataISO);
  };

  let dataVencimento = new Date(dataEmitido);
  console.log("Data de vencimento inicial", dataVencimento);
  console.log("dia data de vencimento inicial", dataVencimento.getUTCDate());

  if (prazoCorrido) {
    dataVencimento.setDate(dataVencimento.getDate() + prazo);
  } else if (!prazoCorrido && prazo > 0) {
    // Obtém a lista de feriados do banco (se houver)
    // const feriados = await prisma.calendario.findMany({
    //     where: { Cale_TipoData: "FERIADO" },
    //     select: { Cale_Data: true }
    // });

    // const feriadosSet = new Set(feriados.map(f => f.Cale_Data.toISOString().split("T")[0]));

    let diasAdicionados = 0;
    while (diasAdicionados < prazo) {
      dataVencimento.setUTCDate(dataVencimento.getUTCDate() + 1);
      if (isDiaUtil(dataVencimento)) {
        diasAdicionados++;
      }
    }
  }

  dataVencimento.setUTCHours(23, 59, 59, 999);
  console.log("Data de vencimento final", dataVencimento);
  return dataVencimento;
};

async function recalcularPrazosHelper() {
  try {
    const processos = await prisma.processos.findMany({
      where: {
        Pcss_DataVencimento: { gte: new Date() },
        // Pcss_TipoPrazo: { Tpraz_Corrido: false },
      },
      include: { Pcss_TipoPrazo: true },
    });
    console.log("Processos a serem recalculados:", processos);
    for (const processo of processos) {
      const novaData = await calculateDataVencimento(
        processo.Pcss_DataEmitido,
        processo.Pcss_TipoPrazo.Tpraz_Dias,
        processo.Pcss_TipoPrazo.Tpraz_Corrido
      );

      await prisma.processos.update({
        where: { id: processo.id },
        data: { Pcss_DataVencimento: novaData },
      });
    }

    return { success: true, message: "Prazos recalculados com sucesso" };
  } catch (error) {
    console.error("Erro ao recalcular prazos:", error);
    return { success: false, error: "Erro ao recalcular prazos" };
  }
}

// Controller para chamadas HTTP
async function recalcularPrazos(req, res) {
  const result = await recalcularPrazosHelper();
  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(500).json({ error: result.error });
  }
}

module.exports = {
  recalcularPrazos,
  calculateDataVencimento,
  recalcularPrazosHelper, // Exporta a helper para uso em outros controllers
};
