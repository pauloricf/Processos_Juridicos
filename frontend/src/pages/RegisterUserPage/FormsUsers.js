import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useFeedback } from "../../context/FeedbackContext";
import api from "../../services/apiConfig";
import styles from "./FormsUsers.module.css"; // Importando o CSS do componente
import { schemaUser } from "../../schemas/userSchema";
import InputMask from "react-input-mask";

export default function Form() {
  const { showFeedback } = useFeedback();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schemaUser),
  });

  const position = watch("position");

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const payload = {
        Usua_Matricula: data.matricula,
        Usua_Nome: data.fullName,
        Usua_Email: data.email,
        Usua_CPF: data.cpf.replace(/\D/g, ""), // Remove símbolos do CPF
        Usua_TipoUsuario: data.position,
        Usua_Identidade: data.rg.replace(/\D/g, ""), // Remove símbolos do RG
        Usua_Telefone: data.phone.replace(/\D/g, ""), // Remove símbolos do telefone
        Usua_Sexo: data.sex,
        Usua_DataNascimento: data.birthday,
        ...(position === "ProcuradorGeral" || position === "ProcuradorEfetivo"
          ? { Pcrd_NumeroOAB: data.numeroOab.replace(/\D/g, "") } // Remove símbolos do número da OAB
          : {}),
      };
      console.log("Payload enviado:", payload);

      await api.post("/cadastrarUsua", payload);
      showFeedback("Funcionário cadastrado com sucesso!", "success");
      navigate("/user");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      showFeedback("Erro ao cadastrar. Verifique os dados e tente novamente.", "error");
    }
  };

  return (
    <div className={styles.form_container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Cadastro de servidores</h2>

        {/* Nome Completo */}
        <div className={styles.form_row}>
          <div className={styles.form_group}>
            <div className={styles.label_form}>
              <label>Nome completo</label>
              <span className="required_asterisk">*</span>
            </div>
            <input type="text" placeholder="Digite seu nome completo" {...register("fullName")} />
            {errors.fullName && <span className={styles.error}>{errors.fullName.message}</span>}
          </div>
        </div>

        {/* RG, CPF e Data de Nascimento */}
        <div className={styles.form_row}>
          <div className={styles.form_group}>
            <div className={styles.label_form}>
              <label>Identidade (RG)</label>
              <span className="required_asterisk">*</span>
            </div>
            <InputMask mask="9999999-9" placeholder="0000000-0" {...register("rg")} />
            {errors.rg && <span className={styles.error}>{errors.rg.message}</span>}
          </div>

          <div className={styles.form_group}>
            <div className={styles.label_form}>
              <label>CPF</label>
              <span className="required_asterisk">*</span>
            </div>
            <InputMask mask="999.999.999-99" placeholder="000.000.000-00" {...register("cpf")} />
            {errors.cpf && <span className={styles.error}>{errors.cpf.message}</span>}
          </div>

          <div className={styles.form_group}>
            <div className={styles.label_form}>
              <label>Data de Nascimento</label>
              <span className="required_asterisk">*</span>
            </div>
            <input type="date" {...register("birthday")} />
            {errors.birthday && <span className={styles.error}>{errors.birthday.message}</span>}
          </div>
        </div>

        {/* Matrícula e Sexo */}
        <div className={styles.form_row}>
          <div className={styles.form_group}>
            <div className={styles.label_form}>
              <label>Matrícula</label>
              <span className="required_asterisk">*</span>
            </div>
            <input
              type="text"
              placeholder="000000000"
              {...register("matricula")}
              onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
            />
            {errors.matricula && <span className={styles.error}>{errors.matricula.message}</span>}
          </div>

          <div className={styles.form_group}>
            <div className={styles.label_form}>
              <label>Sexo</label>
              <span className="required_asterisk">*</span>
            </div>
            <select {...register("sex")}>
              <option value="">Selecione...</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
            {errors.sex && <span className={styles.error}>{errors.sex.message}</span>}
          </div>
        </div>

        {/* Cargo e OAB */}
        <div className={styles.form_row}>
          <div className={styles.form_group}>
            <div className={styles.label_form}>
              <label>Cargo</label>
              <span className="required_asterisk">*</span>
            </div>
            <select {...register("position")}>
              <option value="">Selecione um cargo...</option>
              <option value="ProcuradorGeral">Procurador(a) Geral</option>
              <option value="ProcuradorEfetivo">Procurador(a) Efetivo</option>
              <option value="secretaria">Secretário(a)</option>
              <option value="assessoria">Assessoria</option>
            </select>
            {errors.position && <span className={styles.error}>{errors.position.message}</span>}
          </div>

          <div className={styles.form_group}>
            <div className={styles.label_form}>
              <label>
                Número da OAB:
                {(position === "ProcuradorGeral" || position === "ProcuradorEfetivo") && (
                  <span className="required_asterisk">*</span>
                )}
              </label>
            </div>
            <InputMask
              mask="aa999999"
              placeholder="UF000000"
              {...register("numeroOab")}
              disabled={!["ProcuradorGeral", "ProcuradorEfetivo"].includes(position)}
            />
            {errors.numeroOab && <span className={styles.error}>{errors.numeroOab.message}</span>}
          </div>
        </div>

        {/* Email e Telefone */}
        <div className={styles.form_row}>
          <div className={styles.form_group}>
            <div className={styles.label_form}>
              <label>Email</label>
              <span className="required_asterisk">*</span>
            </div>
            <input type="email" placeholder="Digite seu email" {...register("email")} />
            {errors.email && <span className={styles.error}>{errors.email.message}</span>}
          </div>

          <div className={styles.form_group}>
            <div className={styles.label_form}>
              <label>Telefone</label>
              {/* <span className="required_asterisk">*</span> */}
            </div>
            <InputMask mask="(99) 99999-9999" placeholder="(00) 00000-0000" {...register("phone")} />
            {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
          </div>
        </div>

        {/* Botões */}
        <div className={styles.form_buttons}>
          <button type="button" className={styles.btn_cancel} onClick={() => navigate("/user")}>
            Cancelar
          </button>
          <button type="submit" className={styles.btn_concluir}>
            {"Concluir"}
          </button>
        </div>
      </form>
    </div>
  );
}
