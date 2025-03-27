const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getReports = async (req, res) => {
  try {
    console.log(1)
    const reports = await prisma.procuradores.findMany({
      include: {
        usuario: true,
        Processos: {
          select: {
            Pcss_Status: true,
          },
        },
      },
    });

    return res.status(200).json(reports);
  } catch (error) {
    console.error("Error loading report:", error);
    return res.status(500).json({ error: "Erro ao buscar os relatórios" });
  }
};

module.exports = { getReports };
