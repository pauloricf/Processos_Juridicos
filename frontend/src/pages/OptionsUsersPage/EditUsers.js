import React, { useEffect, useState } from 'react';
import styles from "./EditUsers.module.css";
import { editEmployee, getEmployee, getAttorneys} from '../../services/usersService';
import { useParams } from "react-router-dom";

const EditUsers = () => {
    const { id } = useParams(); // ID do procurador vindo da URL
    const userId = Number(id);

    const [users, setUsers] = useState([]);
    const [procuradores, setProcuradores] = useState([]);
    const [usuarioCorrespondente, setUsuarioCorrespondente] = useState(null);
    const [procur, setProcur] = useState([]);
    const [email, setEmail] = useState(""); // Estado para email
    const [telefone, setTelefone] = useState(""); // Estado para telefone

    useEffect(() => {
        const fetchData = async () => {
            try {
                const procuradoresResponse = await getAttorneys();
                const usersResponse = await getEmployee();

                setProcuradores(procuradoresResponse);
                setUsers(usersResponse);

                console.log("Procuradores carregados: ", procuradoresResponse);
                console.log("Usuários carregados: ", usersResponse);

                // Encontrar o procurador correspondente ao ID da URL
                const procurador = procuradoresResponse.find(proc => proc.id.toString() === id);
                const procur = procuradoresResponse.find(proc => proc.id.toString() === id);
                console.log("Procurador selecionado: ", procur);
                setProcur(procur);

                // Procurar o usuário diretamente na tabela Users
                const usuarioSele = usersResponse.find(user => user.id === userId);
                console.log("Usuário selecionado: ", usuarioSele);

                if (procurador) {
                    // Encontrar o usuário correspondente ao procurador
                    const usuario = usersResponse.find(user => user.id === procurador.Pcrd_Usuario_id);
                    setUsuarioCorrespondente(usuario);
                } else {
                    setUsuarioCorrespondente(usuarioSele);
                }

            } catch (error) {
                console.log("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, [id]);  

    // Função para salvar alterações
    const handleSave = async (e) => {
        e.preventDefault(); // Evitar recarregamento da página

        try {
            let userToUpdate = userId; // Por padrão, atualiza pelo userId

            if (procur && procur.Pcrd_Usuario_id) {
                userToUpdate = procur.Pcrd_Usuario_id; // Atualiza pelo ID do usuário vinculado ao procurador
            }

            const response = await editEmployee(userToUpdate, { Usua_Email: email, Usua_Telefone: telefone });

            if (response) {
                alert("Usuário atualizado com sucesso!");
                console.log("Resposta da API sobre a atualização:", response);
            } else {
                throw new Error("Resposta da API inválida.");
            }
        } catch (error) {
            console.log("Erro ao atualizar usuário:", error);
            alert("Erro ao atualizar usuário.");
        }
    };

    useEffect(() => {
        if (usuarioCorrespondente) {
            setEmail(usuarioCorrespondente.Usua_Email || "");  // Inicializa com o valor do usuário
            setTelefone(usuarioCorrespondente.Usua_Telefone || "");
            console.log("Email do usuário:", usuarioCorrespondente.Usua_Email);
            console.log("Telefone do usuário:", usuarioCorrespondente.Usua_Telefone);
        }
    }, [usuarioCorrespondente]); // Atualiza os estados quando usuarioCorrespondente mudar

    return (
        <div>
            <h2>Editar informações do procurador</h2>
            {usuarioCorrespondente ? (
                <form onSubmit={handleSave}>
                    <div>
                        <label>Nome completo:</label>
                        <input
                            type="text"
                            value={usuarioCorrespondente.Usua_Nome || "Nome não encontrado"}
                            readOnly
                        />
                    </div>

                    <div>
                        <label>Identidade (RG):
                            <input
                                type="text"
                                value={usuarioCorrespondente.Usua_Identidade || "Nome não encontrado"} 
                                readOnly/>
                        </label>

                        <label>CPF:
                            <input
                                type="text"
                                value={usuarioCorrespondente.Usua_CPF || "Nome não encontrado"}
                                readOnly />
                        </label>
                        
                        <label>Data de nascimento:
                            <input
                                type="text"
                                value={usuarioCorrespondente.Usua_Data_Nascimento || "Data não encontrado"}
                                readOnly />
                        </label>

                    </div>

                    <div>
                        <label>Matricula:
                            <input
                                type="text"
                                value={usuarioCorrespondente.Usua_Matricula || "Data não encontrado"}
                                readOnly />
                        </label>

                        <label>Sexo:
                            <input
                                type="text"
                                value={usuarioCorrespondente.Usua_Sexo || "Data não encontrado"}
                                readOnly />
                        </label>

                    </div>

                    <div>
                        <label>Cargo:
                            <input
                                type="text"
                                value={
                                    procur ? `Procurador ${procur.Pcrd_Cargo}` : usuarioCorrespondente?.Usua_TipoUsuario || "Data não encontrada"
                                }
                                readOnly
                            />
                        </label>

                        <label>Número da OAB:
                            <input
                                type="text"
                                value={procur ? procur.Pcrd_NumeroOAB : ""}
                                readOnly
                            />
                        </label>
                    </div>

                    <div>
                        <label>Email:
                            <input
                                type="text"
                                value={email}  // Agora é controlado pelo estado
                                onChange={(e) => setEmail(e.target.value)}
                                />
                        </label>

                        <label>Telefone:
                            <input
                                type="text"
                                value={telefone}  // Agora é controlado pelo estado
                                onChange={(e) => setTelefone(e.target.value)}    
                            />
                        </label>
                    </div>
                    
                    {/* Botão de salvar */}
                    <button type="submit">Salvar alterações</button>

                </form>
            ) : (
                <p>Carregando dados do usuário...</p>
            )}
        </div>
    );
}

export default EditUsers;
