import React, { useContext } from "react";
import styles from "./Sidebar.module.css"; // Alteração para module CSS
import logo_uea from "../img/uea.svg";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegNewspaper, FaPeopleGroup } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import AuthContext from "../context/AuthContext";

function Sidebar() {
  const location = useLocation();
  const { logoutContext } = useContext(AuthContext);
  let page = "";
  switch (true) {
    case location.pathname === "/process":
      page = "process";
      break;
    case location.pathname.startsWith("/process/edit/"):
      page = "process-edit";
      break;
    case location.pathname === "/register-process":
      page = "register-process";
      break;
    case location.pathname === "/register-user":
      page = "register-user";
      break;
    case location.pathname === "/calendar-page":
      page = "calendar-page";
      break;
    default:
      break;
  }

  const logoutUser = () => {
    logoutContext();
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_logo}>
        <div className={styles.logo_uea_container}>
          <img src={logo_uea} alt="Logo da UEA" className={styles.logo_uea} />
        </div>
      </div>
      <ul className={styles.sidebar_ul}>
        <li className={styles.li_content}>
          <Link to="/calendar-page">
            <button className={styles.button_li}>
              <FaRegCalendarAlt className={styles.icon_li} />
              Calendário
            </button>
          </Link>
        </li>
        <li>
          <Link to="/process">
            <button className={`${styles.button_li} ${page === "process" || page === "process-edit" ? styles.active : ""}`}>
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
          <button className={styles.button_li} onClick={logoutUser}>
            <CiLogout style={{ fontSize: "20px" }} />
            Logout
          </button>
        </li>
        {/* <li>
                    <Link to="/register-process">
                        <button 
                            className={`${styles.button_li} ${page === "register-process" ? styles.active : ""}`}
                        >
                            <FaRegCalendarAlt className={styles.icon_li} />
                            Cadastrar
                        </button>
                    </Link>
                </li> */}
      </ul>
    </div>
  );
}

export default Sidebar;
