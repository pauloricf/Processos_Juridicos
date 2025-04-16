import styles from "./LoginPage.module.css";
import { Box, Button, Checkbox, FormControlLabel, Modal, Paper, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useFeedback } from "../../context/FeedbackContext";
import { resetPassword } from "../../services/authService";

const LoginPage = () => {
  const { loginContext } = useContext(AuthContext);
  const navigate = useNavigate();
  const { showFeedback } = useFeedback();
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleCloseModal = () => setOpenModal(false);

  const onSubmit = async (data) => {
    try {
      const response = await loginContext(data);

      if (response.success) {
        if (response.isDefaultPassword) {
          setUserId(response.data.user.id); // Armazena o ID do usuário
          setOpenModal(true); // Abre o modal
        } else {
          showFeedback("Login realizado com sucesso", "success");
          navigate("/process");
        }
      } else {
        showFeedback(response.error || "Erro ao realizar login", "error");
      }
    } catch (error) {
      showFeedback(error.message || "Erro desconhecido ao realizar login", "error");
    }
  };

  const handlePasswordReset = async (newPassword) => {
    try {
      await resetPassword(userId, newPassword); // Chama a função de redefinição de senha
      showFeedback("Senha redefinida com sucesso", "success");
      handleCloseModal();
    } catch (error) {
      showFeedback("Erro ao redefinir senha", "error");
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log(errors); // Adicione esta linha

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    watch: watchReset,
    formState: { errors: errorsReset },
  } = useForm();

  return (
    <div className={styles.page_content}>
      <Paper className={styles.main_container} sx={{ overflow: "auto" }}>
        <h3>Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("cpf", { required: "CPF é obrigatório" })}
            error={!!errors.cpf}
            helperText={errors.cpf?.message}
            label="CPF"
            variant="filled"
            sx={{ width: "100%", backgroundColor: "white", marginBottom: "1rem" }}
          />
          <TextField
            {...register("password", { required: "Senha é obrigatório" })}
            error={!!errors.password}
            helperText={errors.password?.message}
            label="Senha"
            variant="filled"
            type="password"
            sx={{ width: "100%", backgroundColor: "white" }}
          />
          <Button type="submit" sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
            Entrar
          </Button>
        </form>
      </Paper>

      {/* Modal para redefinição de senha */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className={styles.modal_box}>
          <h3>Redefinir Senha</h3>
          {/* Altere para usar handleSubmitReset e registerReset */}
          <form onSubmit={handleSubmitReset((data) => handlePasswordReset(data.newPassword))}>
            <TextField
              {...registerReset("newPassword", { required: "Nova senha é obrigatória" })}
              error={!!errorsReset.newPassword}
              helperText={errorsReset.newPassword?.message}
              label="Nova Senha"
              type="password"
              variant="filled"
              sx={{ width: "100%", marginBottom: "1rem" }}
            />
            <TextField
              {...registerReset("confirmPassword", {
                required: "Confirmação de senha é obrigatória",
                validate: (value) => value === watchReset("newPassword") || "As senhas não coincidem",
              })}
              error={!!errorsReset.confirmPassword}
              helperText={errorsReset.confirmPassword?.message}
              label="Confirmar Senha"
              type="password"
              variant="filled"
              sx={{ width: "100%", marginBottom: "1rem" }}
            />
            <Button type="submit" sx={{ marginTop: "1rem" }}>
              Redefinir Senha
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default LoginPage;
