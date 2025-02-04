import React, { useEffect, useState } from 'react';
import ListUsersPage from "./ListUsersPage";
import styles from "./UsersPage.module.css";
import { FaCircle, FaFilter, FaPlus } from "react-icons/fa";
import { getEmployee, getAttorneys } from '../../services/usersService';
import { getAllProcess } from '../../services/processService';
import { Link } from "react-router-dom";

const UsersPage = () => {

    const [users, setUsers] = useState([]);
    const [processes, setProcesses] = useState([]);
    const [procurador, setProcurador] = useState([]);
    
    const fetchUsers = async () => {
        try {
          const response = await getEmployee();
          console.log("Dados de usuários retornados da API", response);
          setUsers(response);
        } catch (error) {
          console.log(error);
        }
      };

    const fetchProcesses = async () => {
        try{
            const response = await getAllProcess();
            console.log("Dados dos processos retornados da API", response);
            setProcesses(response);
        } catch (error){
            console.log(error);
        }
    }

    const fetchProcurador = async () => {
        try{
            const response = await getAttorneys();
            console.log("Dados de procuradores retornados da API", response);
            setProcurador(response);
        } catch (error){
            console.log(error);
        }
    }


    //useEffect(() => {
    //    fetchUsers();
    //}, []);

    useEffect(() => {
        // Executa ambas as chamadas de forma assíncrona
        const fetchData = async () => {
          await fetchUsers();
          await fetchProcesses();
          await fetchProcurador();
        };
    
        fetchData();
    }, []);

    return (
        <div className={styles.page_content}>
            <div className={styles.main_container}>
                <div className={styles.filter_section_bar}>
                    <label className={styles.label}>Selecionar Status: </label>
                    <button>
                        <FaCircle color="#2871A7" />
                        Emitidos
                    </button>
                    <button>
                        <FaCircle color="#19D109" />
                        Concluídos
                    </button>
                    <button>
                        <FaCircle color="#FF0000" />
                        Vencidos
                    </button>
                    
                    <Link to="/register-user">
                        <FaPlus className={styles.icon_plus}/>
                    </Link>

                    {/* Fazer a opção " < Total/Mês > "  */}
                </div>
                <div className={styles.content}>
                    <h3>Listagem de processos cadastrados</h3>
                        <ListUsersPage
                            users={users}
                            processes={processes}
                            procurador={procurador}
                        />
                </div>
            </div>
        </div>

    );
}

export default UsersPage;