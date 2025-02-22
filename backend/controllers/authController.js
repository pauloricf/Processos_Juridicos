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
    const checkPass = await bcrypt.compare(password, user.Usua_Senha);
    if (!checkPass) {
      res.status(401).json();
    }
    const token = jwt.sign({ id: user.id, name: user.Usua_Nome, role: user.Usua_TipoUsuario }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, user: { id: user.id, name: user.Usua_Nome, role: user.Usua_TipoUsuario } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
};

module.exports = {
  login,
};
