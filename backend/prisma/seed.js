const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const cpf = "5"; // CPF do admin
  const senhaHash = await bcrypt.hash(cpf, 10);

  // Verificar se o usuário admin já existe
  const existingUser = await prisma.usuarios.findUnique({
    where: {
      Usua_CPF: cpf,
    },
  });

  if (!existingUser) {
    await prisma.usuarios.create({
      data: {
        Usua_Matricula: "0001",
        Usua_Nome: "Admin Geral",
        Usua_Email: "admin@exemplo.com",
        Usua_Senha: senhaHash,
        Usua_CPF: cpf,
        Usua_TipoUsuario: "ProcuradorGeral",
        Usua_Identidade: "12345678901234",
        Usua_Telefone: "11999999999",
        Usua_Sexo: "Masculino",
        procuradores: {
          create: {
            Pcrd_NumeroOAB: "12345678901",
            Pcrd_Cargo: "Geral",
          },
        },
      },
    });

    console.log("Usuário admin criado com sucesso!");
  } else {
    console.log("Usuário admin já existe.");
  }

  // Criar instâncias de tiposPrazos
  const tiposPrazos = [
    {
      Tpraz_Tipo: "acao_ordinaria",
      Tpraz_Dias: 30,
      Tpraz_Corrido: false,
    },
    {
      Tpraz_Tipo: "juizado_especial",
      Tpraz_Dias: 10,
      Tpraz_Corrido: false,
    },
    {
      Tpraz_Tipo: "mandado_seguranca",
      Tpraz_Dias: 10,
      Tpraz_Corrido: true,
    },
  ];

  for (const tipoPrazo of tiposPrazos) {
    const existingTipoPrazo = await prisma.tiposPrazos.findFirst({
      where: {
        Tpraz_Tipo: tipoPrazo.Tpraz_Tipo,
      },
    });

    if (!existingTipoPrazo) {
      await prisma.tiposPrazos.create({
        data: tipoPrazo,
      });
      console.log(`Tipo de prazo "${tipoPrazo.Tpraz_Tipo}" criado com sucesso!`);
    } else {
      console.log(`Tipo de prazo "${tipoPrazo.Tpraz_Tipo}" já existe.`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
