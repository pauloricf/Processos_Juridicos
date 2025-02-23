import React, { useEffect, useState } from 'react';
import styles from "./EditUsers.module.css";
import { getEmployee, getAttorneys} from '../../services/usersService';
import { useParams } from "react-router-dom";

const EditUsers = () => {
    const { id } = useParams(); // ID do procurador vindo da URL
    const userId = Number(id);

    const [users, setUsers] = useState([]);
    const [procuradores, setProcuradores] = useState([]);
    const [usuarioCorrespondente, setUsuarioCorrespondente] = useState(null);
    const [procur, setProcur] = useState([]);

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
                setProcur(procur);

                // 1️⃣ Procurar o usuário diretamente na tabela Users
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

    return (
        <div>
            <h2>Editar informações do procurador</h2>
            {usuarioCorrespondente ? (
                <form>
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

                </form>
            ) : (
                <p>Carregando dados do usuário...</p>
            )}
        </div>
    );
}

export default EditUsers;
