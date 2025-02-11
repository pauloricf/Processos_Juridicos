import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { IoCloudUpload } from "react-icons/io5";
import api from "../../services/apiConfig";
import { useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const ModalDocuments = ({ open, onClose, showSnackbar }) => {
  const { id } = useParams();

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("document", file);
    formData.append("Danex_Data", new Date());
    formData.append("Danex_Nome", file.name);
    formData.append("Danex_Documento", file.name); // ou outro caminho caso você precise enviar o caminho
    formData.append("Danex_NumeroProcesso_id", parseInt(id));
    console.log(formData);
    try {
      const response = await api.post("/document/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      showSnackbar("Documento enviado com sucesso", "success");
      onClose();
    } catch (error) {
      showSnackbar("Erro ao enviar documento", "error");
      console.error(error);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-documents-title">
      <div>
        <Box sx={style}>
          <div style={{ display: "flex", textAlign: "left", justifyContent: "space-between", width: "100%" }}>
            <Typography id="modal-documents-title" variant="h6" component="h2" sx={{ textAlign: "left" }}>
              Documentos
            </Typography>
          </div>

          {/* Ícone de upload que abre o seletor de arquivos */}
          <label htmlFor="file-upload" style={{ cursor: "pointer", display: "inline-block", marginTop: "16px" }}>
            <IoCloudUpload size={40} color="#1976d2" />
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }} // Esconde o input de arquivo
          />
          <Typography sx={{ mt: 2 }}>Adicionar novo documento</Typography>

          {file && <Typography sx={{ mt: 2, fontSize: "0.9rem", color: "#555" }}>Arquivo selecionado: {file.name}</Typography>}

          <div>
            <Button variant="contained" type="submit" onClick={handleSubmit} color="primary" sx={{ mt: 3, mr: 2 }}>
              Enviar Documento
            </Button>
            <Button variant="contained" color="primary" sx={{ mt: 3, backgroundColor: "red" }} onClick={onClose}>
              Fechar
            </Button>
          </div>
        </Box>
        {/* <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={severity} sx={{ width: '100%' }} variant='filled'>
            {snackbarMessage}
          </Alert>
      
      </Snackbar> */}
      </div>
    </Modal>
  );
};

export default ModalDocuments;
