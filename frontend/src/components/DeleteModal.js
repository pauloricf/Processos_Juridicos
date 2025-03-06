// components/DeleteUser.js
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa"; // Importando o ícone
import styles from './DeleteModal.module.css';

const DeleteUser = ({ userId, userName, deleteUser }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Abrir o modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    // Fechar o modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Confirmar exclusão
    const handleConfirmDelete = async () => {
        await deleteUser(userId);
        setIsModalOpen(false);
        alert("Usuário Deletado com sucesso");
    };

    return (
        <div>
            {/* Botão que abre o modal */}
            
            <button className={styles.button}
                onClick={handleOpenModal}>
                <FaTrash /> {/* Ícone configurado */}
            </button>

            {/* Modal de confirmação */}
            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modal_container}>
                        <p>Tem certeza que deseja excluir o usuário {userName}?</p>
                        <div className={styles.modal_buttons}>
                            <button className={styles.button_cancel} onClick={handleCloseModal}>Cancelar</button>
                            <button className={styles.button_erase} onClick={handleConfirmDelete}>Excluir</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteUser;
