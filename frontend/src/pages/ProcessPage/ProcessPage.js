import React, { useEffect, useState } from 'react';
import api from '../../services/apiConfig';
import ProcessTable from './ProcessTable';
import  './ProcessPage.css';
import Sidebar from '../../components/Sidebar';
import { FaCircle , FaSearch, FaFilter } from "react-icons/fa";


const ProcessPage = () => {
  const [processes, setProcesses] = useState([]);
  const dataAtual = new Date();
  

  const fetchProcesses = async () => {
    try {
      const response = await api.get('/processo');
      setProcesses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProcesses();
  }, []);

  return (
    <div className="page-content">
      <Sidebar/>
      <div className="main-container">
          <div className="filter-section-bar">
            <label>Selecionar Status: </label>
            <button >
              <FaCircle color='#2871A7'/>
              Emitidos
            </button>
            <button >
              <FaCircle color='#19D109'/>
              Concluidos
            </button>
            <button >
              <FaCircle color='#FF0000'  />
              Vencidos
            </button>
            <div className="search-input-container">
              <input type="text" className="input"></input>
              <FaSearch className="icon_search"/>
            </div>
            <FaFilter className="icon_filter"/>
          </div>
        <div className="content">
          <h3>Listagem de processos cadastrados</h3>
          <ProcessTable processes={processes} data={dataAtual} />
        </div>
      </div>
    </div>
  );
};

export default ProcessPage;
