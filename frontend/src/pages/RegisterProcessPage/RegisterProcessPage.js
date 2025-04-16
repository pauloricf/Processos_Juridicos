import React from "react";
// import { ReactComponent as BackgroundImage } from '../img/azul.svg';
import styles from "./RegisterProcessPage.module.css"; // Alteração para module CSS
import Form from "./RegisterForm";
import ContainerComponent from "../../components/layout/Container";
import HeaderPage from "../../components/layout/HeaderPage";
import GrayBar from "../../components/GrayBar";

function RegisterProcessPage() {
  return (
    <>
      <HeaderPage>
        <GrayBar/>
      </HeaderPage>
      <ContainerComponent>
        <Form />
      </ContainerComponent>
    </>
  );
}

export default RegisterProcessPage;
