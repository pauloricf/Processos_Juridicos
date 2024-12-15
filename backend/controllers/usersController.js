// Importando as libs
const { PrismaClient } = require("@prisma/client");
// const { connect } = require("../routes/processRouter");
const prisma = new PrismaClient();

// Função para cadastrar Funcionários
async function cadastrarFuncionarios(req, res) {
    // Dados recebidos 
    console.log(req.body);

    // Atributos
    const {Usua_Matricula, Usua_Nome, Usua_Email, Usua_CPF, Usua_TipoUsuario, Usua_Identidade, Usua_Telefone, Usua_Sexo, Pcrd_NumeroOAB} = req.body;
    
    try{
         // Atributos que não podem ser vazios
        if(!Usua_Nome || !Usua_CPF || !Usua_Email || !Usua_TipoUsuario || !Usua_Identidade || !Usua_Sexo || !Usua_Telefone){
            res.json({error : "Não é possível cadastrar o usuário porque há dados faltantes"})
         
        } else {
            if (Usua_TipoUsuario === "ProcuradorGeral" || Usua_TipoUsuario === "ProcuradorEfetivo"){

                let cargo;

                if (Usua_TipoUsuario.includes("Geral")){
                    cargo = "Geral";
                } else{
                    cargo = "Efetivo";
                }

                // Objeto para criar o Usuário
                const novoUsuario = await prisma.usuarios.create({
                    data: {
                        Usua_Matricula,
                        Usua_Nome,
                        Usua_CPF,
                        Usua_Identidade,
                        Usua_Senha: Usua_CPF, 
                        Usua_Telefone,
                        Usua_Email,
                        Usua_TipoUsuario,
                        Usua_Sexo,
                        procuradores: {create: {
                            Pcrd_NumeroOAB, 
                            Pcrd_Cargo: cargo
                        }}
                    }
                })

                // Resposta
                res.status(200).json(novoUsuario);
            } else{

                // Objeto para criar o Usuário
                const novoUsuario = await prisma.usuarios.create({
                    data: {
                        Usua_Matricula,
                        Usua_Nome,
                        Usua_CPF,
                        Usua_Identidade,
                        Usua_Senha: Usua_CPF, 
                        Usua_Telefone,
                        Usua_Email,
                        Usua_TipoUsuario,
                        Usua_Sexo,
                    }
                })

                // Resposta
                res.status(200).json(novoUsuario);
            }

        }

    } catch{
        // Mensagem de erro
        res.status(500).json({ error : 'Erro ao criar o processo'});
    }

}

// Exportar funções
module.exports = {
    cadastrarFuncionarios
}