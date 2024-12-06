import React from 'react';
import { TableContainer, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
import "./ProcessTable.css"
import { FaTrash, FaPencil, FaC} from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";

const formatarVencimento = (prazo) => {
  const dataAtual = new Date();
  const dataVencimento = new Date(dataAtual);
  dataVencimento.setDate(dataAtual.getDate() + prazo);

  return dataVencimento.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const ProcessTable = ({ processes }) => {
  console.log(processes);
  return (
      <TableContainer className="table_container">
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
            {processes.map((process) => (
              <TableRow key={process.id}>
                <TableCell>
                  {process.Pcss_Status === "Emitido" && (<FaCircle color='#2871A7'/>)}
                  {process.Pcss_Status === "Concluido" && (<FaCircle color='#19D109'/>)}
                  {process.Pcss_Status === "Vencido" && (<FaCircle color="#FF0000"/>)}
                  </TableCell>
                <TableCell>{process.Pcss_NumeroProcesso}</TableCell>
                <TableCell>{process.Pcss_Siged}</TableCell>
                <TableCell>{process.Pcss_Requerente}</TableCell>
                <TableCell>"Tipo"</TableCell>
                <TableCell>{process.assuntos[0]?.Pass_Assunto || 'assunto'}</TableCell>
                <TableCell>Vencimento</TableCell>
                <TableCell>
                  {formatarVencimento(process.judiciais?.Pjud_Prazo || 0)}
                </TableCell>
                <TableCell>
                  <FaTrash/>
                </TableCell>
                
                <TableCell>
                  <FaPencil/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

  );
};

export default ProcessTable;
