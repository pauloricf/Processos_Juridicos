import React, { useEffect, useState } from "react";
import styles from "./DistributionPage.module.css";
import ListDistributionPage from "./ListDistributionPage";
import { FaCircle, FaFilter, FaPlus } from "react-icons/fa";
import { getEmployee, getAttorneys } from "../../services/usersService";
import { getAllProcess } from "../../services/processService";
import { Link } from "react-router-dom";
import ContainerComponent from "../../components/layout/Container";
import HeaderPage from "../../components/layout/HeaderPage";
import GrayBar from "../../components/GrayBar";

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
    try {
      const response = await getAllProcess();
      console.log("Dados dos processos retornados da API", response);
      setProcesses(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProcurador = async () => {
    try {
      const response = await getAttorneys();
      console.log("Dados de procuradores retornados da API", response);
      setProcurador(response);
    } catch (error) {
      console.log(error);
    }
  };

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
    <>
      <HeaderPage>
        <GrayBar>
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
        </GrayBar>
      </HeaderPage>
      <ContainerComponent>
        <div className={styles.title_container}>
          <h3>Contagem de processos por procurador</h3>
        </div>
        <ListDistributionPage users={users} processes={processes} procurador={procurador} />
      </ContainerComponent>
    </>
  );
};

export default UsersPage;
