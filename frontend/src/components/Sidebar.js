import React from 'react';
import styles from './Sidebar.module.css'; // Alteração para module CSS
import logo_uea from '../img/uea.svg';
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegNewspaper, FaPeopleGroup } from "react-icons/fa6";
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();
    let page = "";
    switch (location.pathname) {
        case "/process":
            page = "process";
            break;
        case "/register-process":
            page = "register-process";
            break
        case "/register-user":
            page = 'register-user';
            break
        default:
            break;
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar_logo}>
                <div className={styles.logo_uea_container}>
                    <img src={logo_uea} alt="Logo da UEA" className={styles.logo_uea} />
                </div>
            </div> 
            <ul className={styles.sidebar_ul}>
                <li className={styles.li_content}>
                    <button className={styles.button_li}>
                        <FaRegCalendarAlt className={styles.icon_li} />
                        Calendário
                    </button>
                </li>
                <li>
                    <Link to="/process">
                        <button 
                            className={`${styles.button_li} ${page === "process" ? styles.active : ""}`}
                        >
                            <FaRegNewspaper className={styles.icon_li} />
                            Processos
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/user">
                    <button className={styles.button_li}>
                        <FaPeopleGroup className={styles.icon_li} />
                        Gerenciar
                    </button>
                    </Link>
                </li>
                <li>
                    <Link to="/register-process">
                        <button 
                            className={`${styles.button_li} ${page === "register-process" ? styles.active : ""}`}
                        >
                            <FaRegCalendarAlt className={styles.icon_li} />
                            Cadastrar
                        </button>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
