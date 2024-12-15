import React from 'react';
import './Sidebar.css';
import logo_uea from '../img/uea.svg';
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegNewspaper, FaPeopleGroup } from "react-icons/fa6";
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();
    let page = ""
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
            break
        
    }
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
            {/* <img src="logo.png" alt="Logo UEA" /> */}
            <div className='logo-uea-container'>
                <img src={logo_uea} alt='Logo da UEA' className='logo-uea'/>
            </div>
            </div> 
            <ul>
                <li className='li-content'>
                    {/* <div> */}
                    <button className='button-li'>
                        <FaRegCalendarAlt className='icon-li'/>
                        Calendario
                    </button>
                    {/* </div> */}
                </li>
                <li>
                    <Link to={"/process"}>
                    <button className={`button-li ${page === "process"? "active" : ""}`}>
                        <FaRegNewspaper className='icon-li'/>
                        Processos
                    </button>
                    </Link>
                </li>
                <li>
                    <button className="button-li">
                        <FaPeopleGroup className='icon-li'/>
                        Funcionários
                    </button>
                </li>
                <li>
                    <Link to={"/register-process"}>
                    <button className={`button-li ${page === "register-process"? "active" : ""}`}>
                        <FaRegCalendarAlt className='icon-li'/>
                        Cadastrar
                    </button>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
