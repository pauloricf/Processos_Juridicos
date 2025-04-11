import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./EditUsers.module.css";
import { editEmployee, getEmployee, getAttorneys } from "../../services/usersService";
import { useParams, Link } from "react-router-dom";

const EditUsers = () => {
  const { id } = useParams();
  const userId = Number(id);
  const { register, handleSubmit, setValue, reset } = useForm();
  const [procur, setProcur] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [procuradoresResponse, usersResponse] = await Promise.all([getAttorneys(), getEmployee()]);

        // Encontrar o procurador e usuário correspondentes
        const procur = procuradoresResponse.find((proc) => proc.id.toString() === id);
        const userToEdit = usersResponse.find((user) => user.id === (procur ? procur.Pcrd_Usuario_id : userId));

        if (userToEdit) {
          // Preencher o formulário com os dados do usuário
          reset({
            ...userToEdit,
            // Campos específicos do procurador
            ...(procur && {
              Pcrd_Cargo: procur.Pcrd_Cargo,
              Pcrd_NumeroOAB: procur.Pcrd_NumeroOAB,
            }),
          });
        }

        setProcur(procur);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      const userToUpdate = procur ? procur.Pcrd_Usuario_id : userId;
      const userData = {
        Usua_Nome: data.Usua_Nome,
        Usua_Identidade: data.Usua_Identidade,
        Usua_CPF: data.Usua_CPF,
        Usua_Data_Nascimento: data.Usua_Data_Nasc0000imento,
        Usua_Matricula: data.Usua_Matricula,
        Usua_Sexo: data.Usua_Sexo,
        Usua_Email: data.Usua_Email,
        Usua_Telefone: data.Usua_Telefone,
      };

      await editEmployee(userToUpdate, userData);
      alert("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      alert("Erro ao atualizar usuário.");
    }
  };

  if (loading) return <p>Carregando dados do usuário...</p>;

  return (
    <div className={styles.form_container}>
      <h2>Editar informações do {procur ? "procurador" : "usuário"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form_row}>
          <label className={styles.label_text}>
            Nome completo:
            <input type="text" {...register("Usua_Nome")} />
          </label>
        </div>

        <div className={styles.form_row}>
          <label className={styles.label_text}>
            Identidade (RG):
            <input type="text" {...register("Usua_Identidade")} />
          </label>

          <label className={styles.label_text}>
            CPF:
            <input type="text" {...register("Usua_CPF")} />
          </label>

          <label className={styles.label_text}>
            Data de nascimento:
            <input type="date" {...register("Usua_Data_Nascimento")} />
          </label>
        </div>

        <div className={styles.form_row}>
          <label className={styles.label_text}>
            Matrícula:
            <input type="text" {...register("Usua_Matricula")} />
          </label>

          <label className={styles.label_text}>
            Sexo:
            <select {...register("Usua_Sexo")}>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </select>
          </label>
        </div>

        {procur && (
          <div className={styles.form_row}>
            <label className={styles.label_text}>
              Cargo:
              <input type="text" {...register("Pcrd_Cargo")} disabled />
            </label>

            <label className={styles.label_text}>
              Número da OAB:
              <input type="text" {...register("Pcrd_NumeroOAB")} />
            </label>
          </div>
        )}

        <div className={styles.form_row}>
          <label className={styles.label_text}>
            Email:
            <input type="email" {...register("Usua_Email")} />
          </label>

          <label className={styles.label_text}>
            Telefone:
            <input type="tel" {...register("Usua_Telefone")} />
          </label>
        </div>

        <div className={styles.form_buttons}>
          <Link to="/user">
            <button type="button" className={styles.btn_cancel}>
              Cancelar
            </button>
          </Link>

          <button type="submit" className={styles.btn_concluir}>
            Salvar alterações
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUsers;
