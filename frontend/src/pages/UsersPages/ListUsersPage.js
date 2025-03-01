import { Fab, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import React from 'react';
import { useState } from "react";
import styles from './ListUsersPage.module.css';
import { FaPencilAlt, FaBed, FaTrash, FaFileAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import DeleteUser from "../../components/DeleteModal";
import { deleteEmployee } from '../../services/usersService';

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
    console.log('informações pegadas de secretário:', secretarios);

    return (
        <div>
            <h4>Procuradores (as)</h4>
            <TableContainer className={styles.table_container}>
                <Table>
                    <TableBody>
                        {processosPorProcurador.map(user => (
                            <TableRow key={user.id}>
                                <TableCell classNameame={styles.text}>
                                    {user.nome}

                                </TableCell>

                                <TableCell>
                                    <Link to={`/user/edit-user/${user.id}`}>
                                        <FaPencilAlt className={styles.icons_pencil} />
                                    </Link>
                                </TableCell>

                                <TableCell>
                                    <FaBed className={styles.icons_user}/>
                                </TableCell>

                                <TableCell>
                                    <DeleteUser
                                        userId={user.id}
                                        deleteUser={user} />
                                </TableCell>

                                <TableCell>
                                    <FaFileAlt className={styles.icons_file}/>
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
                                    <Link to={`/user/edit-user/${user.id}`}>
                                        <FaPencilAlt className={styles.icons_pencil} />
                                    </Link>
                                </TableCell>

                                <TableCell>
                                    <FaBed className={styles.icons_user}/>
                                </TableCell>

                                <TableCell>
                                    <DeleteUser
                                        userId={user.id}
                                        deleteUser={deleteEmployee} />
                                </TableCell>

                                <TableCell>
                                    <FaFileAlt  className={styles.icons_file}/>
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
                                    <Link to={`/user/edit-user/${user.id}`}>
                                        <FaPencilAlt className={styles.icons_pencil} />
                                    </Link>
                                </TableCell>

                                <TableCell>
                                    <FaBed className={styles.icons_user}/>
                                </TableCell>

                                <TableCell>
                                    <FaTrash className={styles.icons_trash}/>
                                </TableCell>

                                <TableCell>
                                    <FaFileAlt  className={styles.icons_file}/>
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