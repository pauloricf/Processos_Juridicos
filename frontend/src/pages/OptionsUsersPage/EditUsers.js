import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./EditUsers.module.css";
import { editEmployee, getEmployee, getAttorneys } from "../../services/usersService";
import { useParams, Link } from "react-router-dom";
import ContainerComponent from "../../components/layout/Container";
import HeaderPage from "../../components/layout/HeaderPage";

const EditUsers = () => {
  const { id } = useParams();
  const userId = Number(id);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [procur, setProcur] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [procuradoresResponse, usersResponse] = await Promise.all([getAttorneys(), getEmployee()]);

        const procur = procuradoresResponse.find((proc) => proc.id.toString() === id);
        const userToEdit = usersResponse.find((user) => user.id === (procur ? procur.Pcrd_Usuario_id : userId));
        console.log("userToEdit", userToEdit);
        if (userToEdit) {
          reset({
            ...userToEdit,
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
        Usua_Data_Nascimento: data.Usua_Data_Nascimento,
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
    <>
      <HeaderPage />
      <ContainerComponent>
        <div className={styles.form_container}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Editar informações do {procur ? "procurador" : "usuário"}</h2>

            {/* Nome Completo */}
            <div className={styles.form_row}>
              <div className={styles.form_group}>
                <div className={styles.label_form}>
                  <label>Nome completo</label>
                </div>
                <input type="text" {...register("Usua_Nome")} />
                {errors.Usua_Nome && <span className={styles.error}>{errors.Usua_Nome.message}</span>}
              </div>
            </div>

            {/* RG, CPF e Data de Nascimento */}
            <div className={styles.form_row}>
              <div className={styles.form_group}>
                <div className={styles.label_form}>
                  <label>Identidade (RG)</label>
                </div>
                <input type="text" {...register("Usua_Identidade")} />
                {errors.Usua_Identidade && <span className={styles.error}>{errors.Usua_Identidade.message}</span>}
              </div>

              <div className={styles.form_group}>
                <div className={styles.label_form}>
                  <label>CPF</label>
                </div>
                <input type="text" {...register("Usua_CPF")} />
                {errors.Usua_CPF && <span className={styles.error}>{errors.Usua_CPF.message}</span>}
              </div>

              <div className={styles.form_group}>
                <div className={styles.label_form}>
                  <label>Data de Nascimento</label>
                </div>
                <input type="date" {...register("Usua_DataNascimento")} />
                {errors.Usua_Data_Nascimento && <span className={styles.error}>{errors.Usua_Data_Nascimento.message}</span>}
              </div>
            </div>

            {/* Matrícula e Sexo */}
            <div className={styles.form_row}>
              <div className={styles.form_group}>
                <div className={styles.label_form}>
                  <label>Matrícula</label>
                </div>
                <input type="text" {...register("Usua_Matricula")} />
                {errors.Usua_Matricula && <span className={styles.error}>{errors.Usua_Matricula.message}</span>}
              </div>

              <div className={styles.form_group}>
                <div className={styles.label_form}>
                  <label>Sexo</label>
                </div>
                <select {...register("Usua_Sexo")}>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
                {errors.Usua_Sexo && <span className={styles.error}>{errors.Usua_Sexo.message}</span>}
              </div>
            </div>

            {/* Cargo e OAB (apenas para procuradores) */}
            {procur && (
              <div className={styles.form_row}>
                <div className={styles.form_group}>
                  <div className={styles.label_form}>
                    <label>Cargo</label>
                    <span className="required_asterisk">*</span>
                  </div>
                  <input type="text" {...register("Pcrd_Cargo")} disabled />
                </div>

                <div className={styles.form_group}>
                  <div className={styles.label_form}>
                    <label>Número da OAB</label>
                    <span className="required_asterisk">*</span>
                  </div>
                  <input type="text" {...register("Pcrd_NumeroOAB")} />
                  {errors.Pcrd_NumeroOAB && <span className={styles.error}>{errors.Pcrd_NumeroOAB.message}</span>}
                </div>
              </div>
            )}

            {/* Email e Telefone */}
            <div className={styles.form_row}>
              <div className={styles.form_group}>
                <div className={styles.label_form}>
                  <label>Email</label>
                  <span className="required_asterisk">*</span>
                </div>
                <input type="email" {...register("Usua_Email")} />
                {errors.Usua_Email && <span className={styles.error}>{errors.Usua_Email.message}</span>}
              </div>

              <div className={styles.form_group}>
                <div className={styles.label_form}>
                  <label>Telefone</label>
                </div>
                <input type="tel" {...register("Usua_Telefone")} />
                {errors.Usua_Telefone && <span className={styles.error}>{errors.Usua_Telefone.message}</span>}
              </div>
            </div>

            {/* Botões */}
            <div className={styles.form_buttons}>
              <Link to="/user">
                <button type="button" className={styles.btn_cancel}>
                  Cancelar
                </button>
              </Link>
              <button type="submit" className={styles.btn_concluir} disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar alterações"}
              </button>
            </div>
          </form>
        </div>
      </ContainerComponent>
    </>
  );
};

export default EditUsers;
