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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
