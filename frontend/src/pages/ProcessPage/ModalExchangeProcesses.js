import { Box, Button, capitalize, Container, Divider, Modal, TextareaAutosize, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AttorneyCard from "./AttorneyCard";
import { sendTransferOrder } from "../../services/transferService";
import AuthContext from "../../context/AuthContext";

// Modal de confirmação
const ModalConfirmation = ({ open, onClose, selectedAttorney, selectedProcessCount, processes }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "50%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflowY: "auto",
  };

  const [inputText, setInputText] = useState("");
  const {user} = useContext(AuthContext)
  const handleChange = (e) => {
    setInputText(e.target.value);
    console.log(inputText);
  };
  console.log("selectedattorney", selectedAttorney)
  // console.log("selectedattorneyusuaid", selectedAttorney.usuario.id)
  const sendTransfer = async (e) => {
    e.preventDefault()
    try {
      const response = await sendTransferOrder({
        Tran_Motivo: inputText,
        Tran_Data: new Date(),
        processos: processes,
        Tran_UsuarioOrigem_id: user.user.id,
        Tran_ProcuradorDestino_id: selectedAttorney.id,
      });
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Container sx={style}>
        <Typography marginBottom={4}>
          Você deseja solicitar a troca de {processes.length} processos com o(a) procurador(a)
          {capitalize(String(selectedAttorney.usuario?.Usua_Nome))}? Essa ação e o motivo desta troca serão registradas nos
          históricos dos processos caso aceita.
        </Typography>
        <Typography>Justificativa de troca:</Typography>
        <TextareaAutosize minRows={7} style={{ width: "100%" }} onChange={handleChange} value={inputText} />
        <Box display={"flex"}>
          <Button sx={{ ml: "auto", mt: "1rem" }} variant="contained" onClick={sendTransfer}>
            Trocar
          </Button>
        </Box>
      </Container>
    </Modal>
  );
};

const ModalExchangeProcesses = ({ open, onClose, selectedProcessCount, attorneys, processes }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "90%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflowY: "auto",
  };

  // Gerenciamento do modal de confirmação
  const [modalConfirmationOpen, setModalConfirmationOpen] = useState(false);
  const [selectedAttorney, setSelectedAttorney] = useState("");
  const handleOpenModalConfirmation = (attorney) => {
    setSelectedAttorney(attorney);
    console.log(selectedAttorney);
    setModalConfirmationOpen(true);
  };

  const handleCloseModalConfirmation = () => setModalConfirmationOpen(false);

  return (
    <>
      <Modal open={open} onClose={onClose} disableEnforceFocus>
        <Container sx={style}>
          <Typography>Com quem deseja trocar os processos selecionados ?</Typography>
          <Typography>Nº de processos selecionados: {processes.length}</Typography>
          <Divider sx={{ marginBottom: "2rem" }} />
          <AttorneyCard attorneys={attorneys} handleOpenModalConfirmation={handleOpenModalConfirmation} />
        </Container>
      </Modal>

      {/* Modal de Confirmação */}
      <ModalConfirmation
        open={modalConfirmationOpen}
        onClose={handleCloseModalConfirmation}
        selectedAttorney={selectedAttorney}
        selectedProcessCount={selectedProcessCount}
        processes={processes}
      />
    </>
  );
};

export default ModalExchangeProcesses;
