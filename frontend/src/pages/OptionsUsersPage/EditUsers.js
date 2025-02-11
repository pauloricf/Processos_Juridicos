import React, { useEffect, useState } from 'react';
import styles from "./EditUsers.module.css";
import { getEmployee, editEmployee, getOneAttorneys } from '../../services/usersService';
import { Link, useParams } from "react-router-dom";
//import api from '../services/apiConfig';

const EditUsers = () => {
    const { id } = useParams(); // Pega os dados da URL
    const [users, setUsers] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await getOneAttorneys(id);
            console.log("Dados de procuradores retornados da API", response);
            setUsers(response);
        } catch (error) {
            console.log("Erro: ", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchUsers();
        }
    }, [id]);

    return (
        <div>
            <h2>Editar informações do servidor público</h2>
            {users ? (
                <form>
                    <div>
                        <label>Nome completo:</label>
                        <input
                            type="text"
                            name="fullName"
                            defaultValue={users.Usua_Nome} // Preenche o valor atual 
                        />
                    </div>
                </form>
            ) : (
                <p>Carregando dados do usuário...</p>
            )}
        </div>
    );
}

export default EditUsers;