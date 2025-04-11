import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { FaAsterisk } from "react-icons/fa";
import { useFeedback } from "../../context/FeedbackContext";
import api from "../../services/apiConfig";
import styles from "./FormsUsers.module.css"; // Importando o CSS do componente

// Esquema de validação com Yup
const schema = yup.object().shape({
  fullName: yup.string().required("Nome completo é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  rg: yup.string().required("RG é obrigatório"),
  cpf: yup
    .string()
    .required("CPF é obrigatório")
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato inválido (000.000.000-00)"),
  matricula: yup.string().required("Matrícula é obrigatória"),
  birthday: yup.date().required("Data de nascimento é obrigatória").max(new Date(), "Data não pode ser futura"),
  sex: yup.string().required("Sexo é obrigatório"),
  position: yup.string().required("Cargo é obrigatório"),
  numeroOab: yup.string().when("position", {
    is: (position) => ["ProcuradorGeral", "ProcuradorEfetivo"].includes(position),
    then: yup.string().required("Número da OAB é obrigatório para procuradores"),
  }),
  phone: yup.string().required("Telefone é obrigatório"),
});

export default function Form() {
  const { showFeedback } = useFeedback();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const position = watch("position");

  const onSubmit = async (data) => {
    try {
      const payload = {
        Usua_Matricula: data.matricula,
        Usua_Nome: data.fullName,
        Usua_Email: data.email,
        Usua_CPF: data.cpf.replace(/\D/g, ""),
        Usua_TipoUsuario: data.position,
        Usua_Identidade: data.rg,
        Usua_Telefone: data.phone,
        Usua_Sexo: data.sex,
        ...(position === "ProcuradorGeral" || position === "ProcuradorEfetivo" ? { Pcrd_NumeroOAB: data.numeroOab } : {}),
      };

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
          <span className={styles.label_text}>Nome completo</span>
          <input type="text" placeholder="Digite seu nome completo" {...register("fullName")} />
          {errors.fullName && <span className={styles.error}>{errors.fullName.message}</span>}
        </div>

        {/* RG, CPF e Data de Nascimento */}
        <div className={styles.form_row}>
          <span className={styles.label_text}>Identidade (RG)</span>
          <input type="text" placeholder="0000000-0" {...register("rg")} />
          {errors.rg && <span className={styles.error}>{errors.rg.message}</span>}

          <span className={styles.label_text}>CPF</span>
          <input type="text" placeholder="000.000.000-00" {...register("cpf")} />
          {errors.cpf && <span className={styles.error}>{errors.cpf.message}</span>}

          <span className={styles.label_text}>Data de Nascimento</span>
          <input type="date" {...register("birthday")} />
          {errors.birthday && <span className={styles.error}>{errors.birthday.message}</span>}
        </div>

        {/* Matrícula e Sexo */}
        <div className={styles.form_row}>
          <span className={styles.label_text}>Matrícula</span>
          <input type="text" placeholder="000000000" {...register("matricula")} />
          {errors.matricula && <span className={styles.error}>{errors.matricula.message}</span>}

          <span className={styles.label_text}>Sexo</span>
          <select {...register("sex")}>
            <option value="">Selecione...</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>
          {errors.sex && <span className={styles.error}>{errors.sex.message}</span>}
        </div>

        {/* Cargo e OAB */}
        <div className={styles.form_row}>
          <span className={styles.label_text}>Cargo</span>
          <select {...register("position")}>
            <option value="">Selecione um cargo...</option>
            <option value="ProcuradorGeral">Procurador(a) Geral</option>
            <option value="ProcuradorEfetivo">Procurador(a) Efetivo</option>
            <option value="secretaria">Secretário(a)</option>
            <option value="assessoria">Assessoria</option>
          </select>
          {errors.position && <span className={styles.error}>{errors.position.message}</span>}

          <span className={styles.label_text}>
            Número da OAB:
            {(position === "ProcuradorGeral" || position === "ProcuradorEfetivo") && <FaAsterisk className={styles.asterisk} />}
          </span>
          <input
            type="text"
            placeholder="UF000000"
            {...register("numeroOab")}
            disabled={!["ProcuradorGeral", "ProcuradorEfetivo"].includes(position)}
          />
          {errors.numeroOab && <span className={styles.error}>{errors.numeroOab.message}</span>}
        </div>

        {/* Email e Telefone */}
        <div className={styles.form_row}>
          <span className={styles.label_text}>Email</span>
          <input type="email" placeholder="Digite seu email" {...register("email")} />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}

          <span className={styles.label_text}>Telefone</span>
          <input type="tel" placeholder="(00) 00000-0000" {...register("phone")} />
          {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
        </div>

        {/* Botões */}
        <div className={styles.form_buttons}>
          <button type="button" className={styles.btn_cancel} onClick={() => navigate("/user")}>
            Cancelar
          </button>
          <button type="submit" className={styles.btn_concluir} disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Concluir"}
          </button>
        </div>
      </form>
    </div>
  );
}
