import React from 'react';
import styles from './SidebarGerenciar.module.css';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaUsers } from "react-icons/fa6";
import { BsArrowLeft } from "react-icons/bs";

function SidebarUser() {
    return (
        <div className={styles.sidebar}>
            <h2 className={styles.title}>Gerenciar</h2>
            <ul className={styles.sidebar_ul}>
                <li>
                    <Link to="/register-process">
                        <button className={styles.button_li}>
                            <BsArrowLeft className={styles.icon_li} />
                            Voltar 
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/user/distribution">
                        <button className={styles.button_li}>
                            {/*<FaUserEdit className={styles.icon_li} />*/}
                            Distribuição de processoa
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/user">
                        <button className={styles.button_li}>
                            <FaUsers className={styles.icon_li} />
                            Lista de Servidores Públicos
                        </button>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default SidebarUser;
