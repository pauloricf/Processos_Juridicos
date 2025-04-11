import React, { useState } from "react";
import axios from "axios";
import api from "../../services/apiConfig";
import styles from "./EditProcessPage.module.css";
import EditForm from "./EditForm";
import { useParams } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import HeaderPage from "../../components/layout/HeaderPage";
import ContainerComponent from "../../components/layout/Container";

const EditProcessPage = () => {
  const { id } = useParams();

  return (
    <>
      <HeaderPage>
        <div className={styles.gray_bar}></div>
      </HeaderPage>
      <ContainerComponent>
        <EditForm id={id} />
      </ContainerComponent>
    </>
  );
};

export default EditProcessPage;
