import React from 'react';
import styles from './SidebarGerenciar.module.css';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaUsers } from "react-icons/fa6";
import { BsArrowLeft } from "react-icons/bs";
import { RiArticleLine } from "react-icons/ri";
import logo_uea from '../img/uea.svg';

function SidebarUser() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar_logo}>
                <div className={styles.logo_uea_container}>
                    <img src={logo_uea} alt="Logo da UEA" className={styles.logo_uea} />
                </div>
            </div> 
            
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
                            <RiArticleLine className={styles.icon_li} />
                            Distribuição de processos
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/user">
                        <button className={styles.button_li}>
                            <FaUsers className={styles.icon_li} />
                            Servidores Públicos
                        </button>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default SidebarUser;
