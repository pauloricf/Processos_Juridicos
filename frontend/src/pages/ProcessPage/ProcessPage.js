import React, { useContext, useEffect, useState } from "react";
import ProcessTable from "./ProcessTable";
import styles from "./ProcessPage.module.css"; // Alterado para importar o módulo CSS
import { FaCircle, FaSearch, FaFilter } from "react-icons/fa";
import { getAllProcess, getProcessesByAttorney, updateProcess } from "../../services/processService";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const ProcessPage = () => {
  const [processes, setProcesses] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  console.log(user.user.id);

  const searchedProcesses = search.length > 0 ? processes.filter((process) => process.Pcss_NumeroProcesso.includes(search)) : [];

  const handleFilteredProcesses = (e) => {
    console.log(1);
  };

  const fetchProcesses = async () => {
    try {
      const response = await getProcessesByAttorney(user.user.id);
      console.log("Dados retornados da API", response);
      setProcesses(response);
    } catch (error) {
      console.log("erro", error);
    }
  };

  useEffect(() => {
    fetchProcesses();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await updateProcess(id, { Pcss_Status: status });
      setProcesses((prevProcesses) => prevProcesses.map((process) => (process.id === id ? { ...process, Pcss_Status: status } : process)));
    } catch (error) {
      console.log(error);
    }
  };

  const calculatePrazo = (date, id) => {
    const dateToday = new Date();
    console.log(dateToday);
    const dateVencimento = new Date(date);
    dateVencimento.setHours(dateVencimento.getHours() + 4 + 23, 59, 59);
    console.log(dateVencimento);

    const diffTime = dateVencimento - dateToday;
    console.log("difftime", diffTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffTime < 0) {
      const process = processes.find((p) => p.id === id);
      if (process && process.Pcss_Status !== "Vencido") {
        updateStatus(id, "Vencido");
      }
    }
    console.log(diffDays);
    return diffDays;
  };

  return (
    <div className={styles.page_content}>
      <div className={styles.main_container}>
        <div className={styles.filter_section_bar}>
          <label>Selecionar Status: </label>
          <button onClick={handleFilteredProcesses}>
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
          <div className={styles.search_input_container}>
            <input type="text" className={styles.input} value={search} onChange={(e) => setSearch(e.target.value)}></input>
            <FaSearch className={styles.icon_search} />
          </div>
          <FaFilter className={styles.icon_filter} />
        </div>
        <div className={styles.content}>
          <div className={styles.title_container}>
            <h3>Listagem de processos cadastrados</h3>
            <IoAddOutline className={styles.add_icon} onClick={() => navigate("/register-process")} />
          </div>
          <ProcessTable processes={search.length > 0 ? searchedProcesses : processes} calculatePrazo={calculatePrazo} />
        </div>
      </div>
    </div>
  );
};

export default ProcessPage;
