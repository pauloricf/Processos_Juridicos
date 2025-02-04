import { Fab, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import React from 'react';
import styles from './ListUsersPage.module.css';
import { FaPencilAlt, FaBed, FaTrash, FaFileAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const UsersTable = ({ users, processes, procurador}) => {
    console.log("Valores de Procurador:", procurador);
    console.log("Valores de users:", users);
    console.log("Valores de processes:", processes);

    const procuradores = users.filter(user =>
        user.Usua_TipoUsuario === 'ProcuradorGeral  ' || user.Usua_TipoUsuario === 'ProcuradorEfetivo'
    );

    const assessores = users.filter(user => 
        user.Usua_TipoUsuario === 'Assessoria       '
    );

    const secretarios = users.filter(user => 
        user.Usua_TipoUsuario === 'Secretária       '
    );

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
            <h4>Procuradores (as)</h4>
            <TableContainer className={styles.table_container}>
                <Table>
                    <TableBody>
                        {processosPorProcurador.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    {user.nome}
                                    
                                    <TableCell>
                                        Total de Processos: {user.totalProcessos}
                                    </TableCell>

                                </TableCell>

                                <TableCell>
                                    <FaPencilAlt className={styles.icons_pencil}/>
                                </TableCell>

                                <TableCell>
                                    <FaBed className={styles.icons_user}/>
                                </TableCell>

                                <TableCell>
                                    <FaTrash className={styles.icons_trash}/>
                                </TableCell>

                                <TableCell>
                                    <FaFileAlt className={styles.icons_file}/>
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

            {/* Assessores */}
            <h4>Assessores (as)</h4>
            <TableContainer className={styles.table_container}>
                <Table>
                    <TableBody>
                        {assessores.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.Usua_Nome}</TableCell>

                                <TableCell >
                                    <FaPencilAlt className={styles.icons_pencil_}/>
                                </TableCell>

                                <TableCell>
                                    <FaBed className={styles.icons_user_}/>
                                </TableCell>

                                <TableCell>
                                    <FaTrash className={styles.icons_trash_}/>
                                </TableCell>

                                <TableCell>
                                    <FaFileAlt  className={styles.icons_file_}/>
                                </TableCell>

                            </TableRow>
                        
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <h4>Secretário (as)</h4>
            <TableContainer className={styles.table_container}>
                <Table>
                    <TableBody>
                        {secretarios.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <TableCell>
                                        {user.Usua_Nome}
                                    </TableCell>
                                </TableCell>

                                <TableCell >
                                    <FaPencilAlt className={styles.icons_pencil_}/>
                                </TableCell>

                                <TableCell>
                                    <FaBed className={styles.icons_user_}/>
                                </TableCell>

                                <TableCell>
                                    <FaTrash className={styles.icons_trash_}/>
                                </TableCell>

                                <TableCell>
                                    <FaFileAlt  className={styles.icons_file_}/>
                                </TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
    );
}

export default UsersTable;