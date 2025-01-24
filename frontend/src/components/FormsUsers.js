import React, { useState } from 'react';
import './FormsUsers.css';
// import Dropdowns from './Dropdowns'
import api from '../services/apiConfig';

function Form() {
   const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    rg: '',
    cpf: '',
    matricula: '',
    birthday: '',
    sex: '',
    position: 'procurador',
    numeroOab: '',
    phone: ''
   })

   const [errors, setErrors] = useState({})
   const [isSubmitting, setIsSubmitting] = useState(false)

   // Atualizar os dados do form
   const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
   // validação dos campos
   const validate = () => {
        const newErrors = {}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
        const phoneRegex = /^\+\d{2} \(\d{2}\) \d{5}-\d{4}$/

        if (!formData.fullName) newErrors.fullName = 'O nome completo é obrigatório.';
        if (!emailRegex.test(formData.email)) newErrors.email = 'Email inválido.';
        if (!cpfRegex.test(formData.cpf)) newErrors.cpf = 'CPF inválido. Use o formato 000.000.000-00.';
        if (!formData.rg) newErrors.rg = 'O RG é obrigatório.';
        if (!formData.matricula) newErrors.matricula = 'A matrícula é obrigatória.';
        if (!formData.birthday) newErrors.birthday = 'A data de nascimento é obrigatória.';
        if (formData.sex === '...') newErrors.sex = 'Selecione um sexo.';
        if (!formData.numeroOab) newErrors.numeroOab = 'O número da OAB é obrigatório.';
        if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Telefone inválido. Use o formato +00 (00) 00000-0000.';

        return newErrors
   }

   // Enviar os dados para a API
   const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/cadastrarUsua', {
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

            alert('Funcionário cadastrado com sucesso!');
            console.log(response.data);
        } catch (error) {
            console.error('Erro ao cadastrar funcionário:', error);
            alert('Erro ao cadastrar funcionário. Confira os dados e tente novamente.');
        }
    };
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                {/* Informações básicas */}
                <h2>Cadastro de Funcionários</h2>
                
                <div className="form-row">
                    <label>Nome completo:
                        <input type="text" placeholder='Digite seu nome completo' name='fullName' required onChange={handleChange} value={formData.fullName}/>
                        {errors.fullName && <span className="error">{errors.fullName}</span>}
                    </label>

                    <label>Email:
                        <input type="email" placeholder='Digite seu email' name='email' required onChange={handleChange} value={formData.email}/>
                        {errors.email && <span className="error">{errors.email}</span>}
                    </label>
                </div>

                <div className="form-row">
                    <label>Identidade (RG): 
                        <input type="text" name="rg" id="rg" placeholder='0000000-0' required value={formData.rg} onChange={handleChange}/>
                        {errors.rg && <span className="error">{errors.rg}</span>}
                    </label>

                    <label>CPF:
                        <input type="text" name='cpf' id='cpf' placeholder='000.000.000-00' required value={formData.cpf} onChange={handleChange}/>
                        {errors.cpf && <span className="error">{errors.cpf}</span>}
                    </label>

                    <label>Matrícula:
                        <input type="text" name='matricula' id='matricula' placeholder='000000000' required value={formData.matricula} onChange={handleChange}/>
                        {errors.matricula && <span className="error">{errors.matricula}</span>}
                    </label>

                    <label>Data de nascimento: 
                        <input type="date" name="birthday" id="birthday" required value={formData.birthday} onChange={handleChange}/>
                        {errors.birthday && <span className="error">{errors.birthday}</span>}
                    </label>

                    <label>Sexo: 
                        <select name="sex" id="sex" value={formData.sex} onChange={handleChange} required>
                            <option value="...">...</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                        </select>
                        {errors.sex && <span className="error">{errors.sex}</span>}
                    </label>
                </div>

                <div className="form-row">
                    <label>Cargo:
                        <select name="position" id="position" value={formData.position} onChange={handleChange} required>
                            <option value="procurador">Procurador(a)</option>
                            <option value="advogado">Advogado(a)</option>
                            <option value="estagiario">Estagiário(a)</option>
                            {/* outras opções */}
                        </select>
                    </label>

                    <label>Número da OAB:
                        <input type="text" placeholder='UF000000' name='numeroOab' required value={formData.numeroOab} onChange={handleChange}/>
                        {errors.numeroOab && <span className="error">{errors.numeroOab}</span>}
                    </label>

                    <label>Telefone:
                        <input type="tel" placeholder='+00 (00) 00000-0000' name='phone' required value={formData.phone} onChange={handleChange}/>
                        {errors.phone && <span className="error">{errors.phone}</span>}
                    </label>
                </div>

                <div className="form-buttons">
                    <button type="submit" className='btn-concluir' disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'Concluir'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Form;
