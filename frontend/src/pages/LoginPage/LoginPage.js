import styles from "./LoginPage.module.css";
import { Button, Checkbox, FormControlLabel, Paper, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { loginContext } = useContext(AuthContext)
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    console.log(data);
    const response = await loginContext(data);
    if (response) navigate("/process")
    console.log(response);
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
          <TextField {...register("password")} label="Senha" variant="filled" type="password" sx={{ width: "100%", backgroundColor: "white" }} />
          <FormControlLabel control={<Checkbox />} label="Mantenha-me conectado" />

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
