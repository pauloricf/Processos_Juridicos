import React, { useEffect, useState } from "react";
import ListUsersPage from "./ListUsersPage";
import styles from "./UsersPage.module.css";
import { FaCircle, FaFilter, FaPlus } from "react-icons/fa";
import { getEmployee, getAttorneys } from "../../services/usersService";
import { getAllProcess } from "../../services/processService";
import { Link, useNavigate } from "react-router-dom";
import HeaderPage from "../../components/layout/HeaderPage";
import ContainerComponent from "../../components/layout/Container";
import GrayBar from "../../components/GrayBar";
import { IoAddOutline } from "react-icons/io5";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [procurador, setProcurador] = useState([]);
  const navigate = useNavigate();

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
          <div></div>
        </GrayBar>
      </HeaderPage>
      <ContainerComponent>
        <div className={styles.title_container}>
          <h3>Listagem de servidores públicos</h3>
          <IoAddOutline className={styles.add_icon} onClick={() => navigate("/user/register-user")} />
        </div>
        <ListUsersPage users={users} processes={processes} procurador={procurador} />
      </ContainerComponent>
    </>
  );
};

export default UsersPage;
