import React, { useState } from 'react';
import axios from 'axios';
import api from '../../services/apiConfig';
import styles from "./EditProcessPage.module.css";
import EditForm from './EditForm';
import { useParams } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';

const EditProcessPage = () => {
  const { id } = useParams()

  
  return (
      <div className={styles.page_content}>
          <div className={styles.main_container}>
            <div className={styles.gray_bar}></div>
            <div className={styles.content}>
                <EditForm id = {id}/>
            </div>
      </div>
      
      </div>
  );
};

export default EditProcessPage;
