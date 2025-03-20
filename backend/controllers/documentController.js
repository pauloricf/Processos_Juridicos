const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function anexarDocumento(req, res) {
  try {
    console.log(1);
    const { Danex_Nome, Danex_Usuario, Danex_NumeroProcesso_id } = req.body;
    const filePath = `/uploads/${req.file.filename}`;

    // Criação do registro no banco de dados
    const novoDocumento = await prisma.documentosAnexados.create({
      data: {
        Danex_Data: new Date(),
        Danex_Nome,
        Danex_Documento: filePath,
        // Danex_Usuario: parseInt(Danex_Usuario),
        Danex_NumeroProcesso_id: parseInt(Danex_NumeroProcesso_id),
      },
    });

    res.status(201).json({ message: "Documento anexado com sucesso", novoDocumento });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao anexar documento" });
  }
}

const getDocumentsByProcessId = async (req, res) => {
  try {
    const { id } = req.params;
    const documents = await prisma.documentosAnexados.findMany({
      where: {
        Danex_NumeroProcesso_id: parseInt(id),
      },
    });

    res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar documentos" });
  }
}

const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.documentosAnexados.delete({
      where: {
        Danex_Id: parseInt(id),
      },
    });

    res.status(204).json({ message: "Documento deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar documento" });
  }
}

module.exports = { anexarDocumento, getDocumentsByProcessId, deleteDocument};
