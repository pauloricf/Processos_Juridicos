import { Fab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import styles from './ListDistributionPage.module.css';
import { FaPencilAlt, FaBed, FaTrash, FaFileAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ListDistributionPage = ({ users, processes, procurador}) => {
    console.log("Valores de Procurador:", procurador);
    console.log("Valores de users:", users);
    console.log("Valores de processes:", processes);

    const processosPorProcurador = (procurador ?? []).map(procurador => {
        const usuarioProcurador = users.find(user => user.id === procurador.Pcrd_Usuario_id);
        const nomeProcurador = usuarioProcurador ? usuarioProcurador.Usua_Nome : "Nome não encontrado";
      
        const processosDoProcurador = processes.filter(proc => proc.Pcss_Procurador_id === procurador.id);
      
        return {
          ...procurador,
          nome: nomeProcurador,
          totalProcessos: processosDoProcurador.length,
          emitidos: processosDoProcurador.filter(proc => proc.Pcss_Status === "Emitido").length,
          concluidos: processosDoProcurador.filter(proc => proc.Pcss_Status === "Concluído").length,
          vencidos: processosDoProcurador.filter(proc => proc.Pcss_Status === "Vencido").length,
        };
      });
          
    console.log('informações pegadas:', processosPorProcurador);

    return (
        <div>
            <TableContainer className={styles.table_container}>
                <Table>
                    <TableHead>
                        <TableCell>Procuradores</TableCell>

                        <TableCell>Total de Processos</TableCell>

                        <TableCell> </TableCell>
                    </TableHead>

                    <TableBody>
                        {processosPorProcurador.map(user => (
                            <TableRow key={user.id}>
                                <TableCell classNameame={styles.text}>
                                    {user.nome}

                                    {/**
                                    <TableCell>
                                        Total de Processos: {user.totalProcessos}
                                    </TableCell>
                                     */}
                                    
                                </TableCell>

                                <TableCell>
                                    {user.totalProcessos}
                                </TableCell>

                                <TableCell className={styles.number_process_emitido}>
                                    {user.emitidos}   
                                </TableCell>

                                <TableCell className={styles.number_process_concluido}>
                                    {user.concluidos}       
                                </TableCell>

                                <TableCell className={styles.number_process_vencido}>
                                    {user.vencidos}
                                </TableCell>
                            
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
    );
}

export default ListDistributionPage;