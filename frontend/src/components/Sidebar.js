import React from 'react';
import './SideBar.css';
import logo_uea from '../img/uea.svg';
import image_func from '../img/image_func.svg';
import image_calen from '../img/image_calen.svg';
import image_processos from '../img/image_processos.svg';
import image_cadProce from '../img/image_cadProce.svg';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
            {/* <img src="logo.png" alt="Logo UEA" /> */}
            <img src={logo_uea} alt='Logo da UEA' />
            </div> 
            <ul>
                <li>
                    <div className='box-option'>
                    <img src={image_calen} alt='Calendario' />
                        Calendário
                    </div>
                </li>
                <li>
                    <div className='box-option'>
                        <img src={image_processos} alt='Logo' />
                        Processos
                    </div>
                </li>
                <li>
                    <div className='box-option'>
                        <img src={image_func} alt='Cad Funcionario' />
                        Funcionários
                    </div>
                </li>
                <li>
                    <div className='box-option'>
                        <img src={image_cadProce} alt='Cad Processos' />
                        Cadastrar
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
