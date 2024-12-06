//import React, {useState} from 'react';
//import { ReactComponent as BackgroundImage } from '../img/azul.svg';
import './cadastrarProcessos.css';
import SideBar from '../components/SideBar';
import Forms from '../components/Forms';

function CadastrarProcessos() {
    

    return (
        <div className="main-container">
            <SideBar />
            <div className="content">
                <Forms />
            </div>
        </div>
    );
} 

export default CadastrarProcessos;
