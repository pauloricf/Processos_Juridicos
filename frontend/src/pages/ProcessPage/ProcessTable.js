import React from 'react';
import { TableContainer, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
import styles from './ProcessTable.module.css'; // Alteração para module CSS
import { FaTrash, FaPencil, FaCircle } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';

const formatDate = (date) => {
  const dateIso = new Date(date);
  return dateIso.toLocaleDateString('pt-BR', {
    timeZone: 'UTC',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};



const ProcessTable = ({ processes, calculatePrazo, updateStatus }) => {
  console.log(processes);
  const navigate = useNavigate();
  return (
    <TableContainer className={styles.table_container}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>Nº do Processo</TableCell>
            <TableCell>Nº do Siged</TableCell>
            <TableCell>Requerente</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Assunto</TableCell>
            <TableCell>Vencimento</TableCell>
            <TableCell>Prazo</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {processes?.map((process) => (
            <TableRow key={process.id}>
              <TableCell>
                {process.Pcss_Status === "Emitido" && <FaCircle color='#2871A7' />}
                {process.Pcss_Status === "Concluído" && <FaCircle color="#19D109" />}
                {process.Pcss_Status === "Vencido" && <FaCircle color="#FF0000" />}
              </TableCell>
              <TableCell>{process.Pcss_NumeroProcesso}</TableCell>
              <TableCell>{process.Pcss_Siged}</TableCell>
              <TableCell>{process.Pcss_Requerente}</TableCell>
              <TableCell>
                {
                  process.Pcss_TipoPrazoId === 1 ? "AO" :
                  process.Pcss_TipoPrazoId === 2 ? "JE" :
                  process.Pcss_TipoPrazoId === 3 ? "MS" :
                  "Personalizado"
                }
                
              </TableCell>
              <TableCell>{process.assuntos[0]?.Pass_Assunto || 'assunto'}</TableCell>
              <TableCell>{formatDate(process.Pcss_DataVencimento)}</TableCell>
              <TableCell>
                {calculatePrazo(process.Pcss_DataVencimento, process.id)}
              </TableCell>
              <TableCell>
                <FaTrash />
              </TableCell>
              <TableCell>
                <Link to={`/process/edit/${process.id}`}>
                  <FaPencil/>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProcessTable;
