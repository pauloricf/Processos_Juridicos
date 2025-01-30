import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import styles from './ListUsersPage.module.css';
import { FaTrash, FaPencil, FaCircle } from "react-icons/fa6";

const UsersTable = ({ users }) => {

    console.log(users);

    const procuradores = users.filter(user =>
        user.Usua_TipoUsuario === 'ProcuradorGeral  ' || user.Usua_TipoUsuario === 'ProcuradorEfetivo'
    );

    const assessores = users.filter(user => 
        user.Usua_TipoUsuario === 'Assessoria       '
    );

    const secretarios = users.filter(user => 
        user.Usua_TipoUsuario === 'Secretária       '
    );

    return (
        <div>
            <h4>Procuradores (as)</h4>
            <TableContainer className={styles.table_container}>
                <Table>
                    <TableBody>
                        {procuradores.length > 0 ? (
                            procuradores.map(user => (
                                <TableRow key={user.Usua_Id}>
                                    <TableCell>{user.Usua_Nome}</TableCell>
                                    
                                    <TableCell>
                                        <FaPencil className={styles.icons_pencil}/>
                                    </TableCell>

                                    <TableCell>
                                        <FaTrash className={styles.icons_trash}/>
                                    </TableCell>
                                    
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2}>Nenhum procurador encontrado.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Assessores */}
            <h4>Assessores (as)</h4>
            <TableContainer className={styles.table_container}>
                <Table>
                    <TableBody>
                        {assessores.map(user => (
                            <TableRow key={user.Usua_Id}>
                                <TableCell>{user.Usua_Nome}</TableCell>
                                <FaPencil/>
                                <FaTrash/>
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
                                <FaPencil/>
                                <FaTrash/>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
    );
}

export default UsersTable;