const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { cpf, password } = req.body;
    const user = await prisma.usuarios.findFirst({
      where: {
        Usua_CPF: cpf,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const checkPass = await bcrypt.compare(password, user.Usua_Senha);

    if (!checkPass) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    // Verifica se a senha é igual ao CPF
    const isDefaultPassword = await bcrypt.compare(cpf, user.Usua_Senha);

    const token = jwt.sign({ id: user.id, name: user.Usua_Nome, role: user.Usua_TipoUsuario }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      token,
      user: { id: user.id, name: user.Usua_Nome, role: user.Usua_TipoUsuario },
      isDefaultPassword, // Retorna flag indicando se a senha é igual ao CPF
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.usuarios.update({
      where: { id: parseInt(id) },
      data: { Usua_Senha: hashedPassword },
    });

    res.status(200).json({ message: "Senha redefinida com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao redefinir senha" });
  }
};

module.exports = {
  login,
  resetPassword
};
