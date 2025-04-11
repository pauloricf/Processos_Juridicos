import styles from "./LoginPage.module.css";
import { Button, Checkbox, FormControlLabel, Paper, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useFeedback } from "../../context/FeedbackContext";

const LoginPage = () => {
  const { loginContext } = useContext(AuthContext);
  const navigate = useNavigate();
  const { showFeedback } = useFeedback();

  const onSubmit = async (data) => {
    try {
      const response = await loginContext(data);

      if (response.success) {
        showFeedback("Login realizado com sucesso", "success");
        navigate("/process");
      } else {
        showFeedback(response.error || "Erro ao realizar login", "error");
      }
    } catch (error) {
      showFeedback(error.message || "Erro desconhecido ao realizar login", "error");
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
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
          {/* <FormControlLabel control={<Checkbox />} label="Mantenha-me conectado" /> */}

          <Button type="submit" sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
            Entrar
          </Button>
          <Button>Esqueci minha senha</Button>
        </form>
      </Paper>
    </div>
  );
};

export default LoginPage;
