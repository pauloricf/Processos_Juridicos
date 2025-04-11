import React from "react";
// import { ReactComponent as BackgroundImage } from '../img/azul.svg';
import styles from "./RegisterProcessPage.module.css"; // Alteração para module CSS
import Form from "./RegisterForm";
import ContainerComponent from "../../components/layout/Container";
import HeaderPage from "../../components/layout/HeaderPage";

function RegisterProcessPage() {
  return (
    <>
      <HeaderPage>
        <div className={styles.gray_bar}></div>
      </HeaderPage>
      <ContainerComponent className={styles.content}>
        <Form />
      </ContainerComponent>
    </>
  );
}

export default RegisterProcessPage;
