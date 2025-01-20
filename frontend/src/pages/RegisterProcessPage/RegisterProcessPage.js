import React from 'react';
// import { ReactComponent as BackgroundImage } from '../img/azul.svg';
import styles from './RegisterProcessPage.module.css'; // Alteração para module CSS
import Forms from './Forms';

function RegisterProcessPage() {
    return (
        <div className={styles.page_content}>
            <div className={styles.main_container}>
                <div className={styles.gray_bar}></div>
                <div className={styles.content}>
                    <Forms />
                </div>
            </div>
        </div>
    );
}

export default RegisterProcessPage;
