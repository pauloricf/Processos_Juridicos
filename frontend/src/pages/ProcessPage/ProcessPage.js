import React, { useEffect, useState } from 'react';
import api from '../../services/apiConfig';
import ProcessTable from './ProcessTable';
import styles from './ProcessPage.module.css';

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
    <div className={styles.background}>
      <div className={styles.content}>
        <h3>Listagem de processos cadastrados</h3>
        <ProcessTable processes={processes} data={dataAtual} />
      </div>
    </div>
  );
};

export default ProcessPage;
