import React, { useState } from 'react';
import './FormsUsers.css';
// import Dropdowns from './Dropdowns'
import api from '../services/apiConfig';

// Função para formatar datas no padrão ISO 8601
const formatDateToISO = (date) => {
    if (!date) return null; // Se a data não for fornecida, retorna null
    const isoDate = new Date(date).toISOString();
    return isoDate;
}

function Form() {
    // Estado para armazenar os valores do formulário
    const [formData, setFormData] = useState({
        Pcss_NumeroProcesso: '',
        Pcss_Siged: '',
        Pjud_Vara: '',
        Pcss_Destino: '',
        Pcss_ValorAcao: '',
        Pjud_DataIntimacao: '',
        Pjud_DataAudiencia: '',
        Pjud_LocalAudiencia: '',
        Pcss_Requerente: '',
        Pcss_Requerido: '',
        Pcss_Observacoes: ''
        //Pass_Assuntos
    });


    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{

            // Converte as datas para o formato ISO antes de enviar ao backend
            const dataToSend = {
                ...formData,
                Pjud_DataIntimacao: formatDateToISO(formData.Pjud_DataIntimacao),
                Pjud_DataAudiencia: formatDateToISO(formData.Pjud_DataAudiencia),
            };

            const response = await api.post("/cadastrar", dataToSend);
            
            const data = await response.json();

            if (response.status === 201 || response.status === 200) {
                alert("Processo cadastrado com sucesso");

                setFormData({ // Limpa o formulário após o envio
                    Pcss_NumeroProcesso: '',
                    Pcss_Siged: '',
                    Pjud_Vara: '',
                    Pcss_Destino: '',
                    Pcss_ValorAcao: '',
                    Pjud_DataIntimacao: '',
                    Pjud_DataAudiencia: '',
                    Pjud_LocalAudiencia: '',
                    Pcss_Requerente: '',
                    Pcss_Requerido: '',
                    Pcss_Observacoes: ''
                    //Pass_Assuntos
                });
            } else{
                alert(`Erro: ${data.error}`);
            }

        } catch (error){
            console.error('Erro ao cadastrar o processo:', error);
            alert('Erro ao cadastrar o processo.');
        }
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                {/* Informações básicas */}
                <h2>Cadastro de Funcionários</h2>
                
                <div className="form-row">
                    <label>Nome completo:
                        <input type="text" placeholder='Digite seu nome completo' name='fullName'/>
                    </label>

                    <label>Email:
                        <input type="email" placeholder='Digite seu email' name='email' />
                    </label>
                </div>

                <div className="form-row">
                    <label>Identidade (RG):
                        <input type="text" name="rg" id="rg" placeholder='0000000-0'/>
                    </label>

                    <label>CPF:
                        <input type="text" name='cpf' id='cpf' placeholder='000.000.000-00'/>
                    </label>

                    <label>Matrícula:
                        <input type="text" name='matricula' id='matricula' placeholder='000000000' />
                    </label>

                    <label>Data de nascimento: 
                        <input type="date" name="birthday" id="birthday" />
                    </label>

                    <label>Sexo: 
                        <select name="sex" id="sex">
                            <option value="...">...</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                        </select>
                    </label>
                </div>

                <div className="form-row">
                    <label>Cargo:
                        <select name="position" id="position">
                            <option value="procurador">Procurador(a)</option>
                            {/* outras opções */}
                        </select>
                    </label>

                    <label>Número da OAB:
                        <input type="text" placeholder='UF000000' name='numeroOab'/>
                    </label>

                    <label>Telefone:
                        <input type="tel" placeholder='+00 (00) 00000-0000' name='phone'/>
                    </label>
                </div>

                <div className="form-buttons">
                    <button type="submit" className='btn-concluir'>Concluir</button>
                </div>
            </form>
        </div>
    );
}

export default Form;
