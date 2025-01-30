import React, { useEffect, useState } from 'react';
import ListUsersPage from "./ListUsersPage";
import styles from "./UsersPage.module.css";
import { FaCircle, FaSearch, FaFilter } from "react-icons/fa";
import { getEmployee, editEmployee } from '../../services/usersService';

const UsersPage = () => {

    const [users, setUsers] = useState([]);
    
    const fetchUsers = async () => {
        try {
          const response = await getEmployee();
          console.log("Dados retornados da API", response);
          setUsers(response);
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        fetchUsers();
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
                    
                    <FaFilter className={styles.icon_filter} />

                    {/* Fazer a opção " < Total/Mês > "  */}
                </div>
                <div className={styles.content}>
                    <h3>Listagem de processos cadastrados</h3>
                        <ListUsersPage
                            users={users}
                        />
                </div>
            </div>
        </div>

    );
}

export default UsersPage;