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

module.exports = { anexarDocumento };
