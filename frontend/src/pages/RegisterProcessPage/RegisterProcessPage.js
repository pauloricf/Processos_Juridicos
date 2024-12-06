//import React, {useState} from 'react';
//import { ReactComponent as BackgroundImage } from '../img/azul.svg';
import './RegisterProcessPage.css';
import Sidebar from '../../components/Sidebar';
import Forms from '../../components/Forms';

function RegisterProcessPage() {
    return (
        <div className="page-content">
            <Sidebar />
            <div className='main-container'>
                <div className='gray-bar'>
                </div>
                <div className="content">
                    <Forms />
                </div>
            </div>
        </div>
    );
} 

export default RegisterProcessPage;
