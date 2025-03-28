import React, { useState } from "react";
import "./FormsUsers.css";
// import Dropdowns from './Dropdowns'
import api from "../../services/apiConfig";
import { Link } from "react-router-dom";
import { FaAsterisk } from "react-icons/fa";

function Form() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    rg: "",
    cpf: "",
    matricula: "",
    birthday: "",
    sex: "",
    position: "",
    numeroOab: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Atualizar os dados do form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar os dados para a API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.position === "ProcuradorGeral" || formData.position === "ProcuradorEfetivo") {
      try {
        console.log("Dados do número OAB", formData.numeroOab);
        const response = await api.post("/cadastrarUsua", {
          Usua_Matricula: formData.matricula,
          Usua_Nome: formData.fullName,
          Usua_Email: formData.email,
          Usua_CPF: formData.cpf,
          Usua_TipoUsuario: formData.position,
          Usua_Identidade: formData.rg,
          Usua_Telefone: formData.phone,
          Usua_Sexo: formData.sex,
          Pcrd_NumeroOAB: formData.numeroOab,
        });

        console.log("Dados do número OAB", response.Pcrd_NumeroOAB);
        alert("Funcionário cadastrado com sucesso!");
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao cadastrar funcionário:", error);
        alert("Erro ao cadastrar funcionário. Confira os dados e tente novamente.");
      }
    } else {
      try {
        const response = await api.post("/cadastrarUsua", {
          Usua_Matricula: formData.matricula,
          Usua_Nome: formData.fullName,
          Usua_Email: formData.email,
          Usua_CPF: formData.cpf,
          Usua_TipoUsuario: formData.position,
          Usua_Identidade: formData.rg,
          Usua_Telefone: formData.phone,
          Usua_Sexo: formData.sex,
        });

        alert("Funcionário cadastrado com sucesso!");
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao cadastrar funcionário:", error);
        alert("Erro ao cadastrar funcionário. Confira os dados e tente novamente.");
      }
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {/* Informações básicas */}
        <h2>Cadastro de servidores</h2>

        <div className="form-row">
          <label>
            <span className="label-text">
              Nome completo: <FaAsterisk className="asterisk" />
            </span>
            <input
              type="text"
              placeholder="Digite seu nome completo"
              name="fullName"
              required
              onChange={handleChange}
              value={formData.fullName}
            />
            {errors.fullName && <span className="error">{errors.fullName}</span>}
          </label>
        </div>

        <div className="form-row">
          <label>
            <span className="label-text">
              Identidade (RG): <FaAsterisk className="asterisk" />
            </span>
            <input type="text" name="rg" id="rg" placeholder="0000000-0" required value={formData.rg} onChange={handleChange} />
            {errors.rg && <span className="error">{errors.rg}</span>}
          </label>

          <label>
            <span className="label-text">
              CPF: <FaAsterisk className="asterisk" />
            </span>
            <input
              type="text"
              name="cpf"
              id="cpf"
              placeholder="000.000.000-00"
              required
              value={formData.cpf}
              onChange={handleChange}
            />
            {errors.cpf && <span className="error">{errors.cpf}</span>}
          </label>

          <label>
            <span className="label-text">
              Data de Nascimento: <FaAsterisk className="asterisk" />
            </span>
            <input type="date" name="birthday" id="birthday" required value={formData.birthday} onChange={handleChange} />
            {errors.birthday && <span className="error">{errors.birthday}</span>}
          </label>
        </div>

        <div className="form-row">
          <label>
            <span className="label-text">
              Matrícula: <FaAsterisk className="asterisk" />
            </span>
            <input
              type="text"
              name="matricula"
              id="matricula"
              placeholder="000000000"
              required
              value={formData.matricula}
              onChange={handleChange}
            />
            {errors.matricula && <span className="error">{errors.matricula}</span>}
          </label>

          <label>
            <span className="label-text">
              Sexo: <FaAsterisk className="asterisk" />
            </span>
            <select name="sex" id="sex" value={formData.sex} onChange={handleChange} required>
              <option value="...">...</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
            {errors.sex && <span className="error">{errors.sex}</span>}
          </label>
        </div>

        <div className="form-row">
          <label>
            <span className="label-text">
              Cargo: <FaAsterisk className="asterisk" />
            </span>
            <select name="position" id="position" value={formData.position} onChange={handleChange} required>
              <option value="" disabled>
                Selecione um cargo...
              </option>
              <option value="ProcuradorGeral">Procurador(a) Geral</option>
              <option value="ProcuradorEfetivo">Procurador(a) Efetivo</option>
              <option value="Secretária">Secretario(a)</option>
              <option value="Assessoria">Assessoria</option>
              {/* outras opções */}
            </select>
          </label>

          <label>
            Número da OAB:
            <input type="text" placeholder="UF000000" name="numeroOab" value={formData.numeroOab} onChange={handleChange} />
            {errors.numeroOab && <span className="error">{errors.numeroOab}</span>}
          </label>
        </div>

        <div className="form-row">
          <label>
            <span className="label-text">
              Email: <FaAsterisk className="asterisk" />
            </span>
            <input
              type="email"
              placeholder="Digite seu email"
              name="email"
              required
              onChange={handleChange}
              value={formData.email}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>

          <label>
            Telefone:
            <input type="tel" placeholder="0000000-0000" name="phone" required value={formData.phone} onChange={handleChange} />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </label>
        </div>

        <div className="form-buttons">
          <Link to="/user">
            <button className="btn-cancel">Cancelar</button>
          </Link>

          <button type="submit" className="btn-concluir" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Concluir"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
