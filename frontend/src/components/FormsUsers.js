import React, { useState } from 'react';
import './Forms.css';
import Dropdowns from './Dropdowns'
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
                <section>
                    <div className="form-row">
                        <input type="text" placeholder="Nome Completo:" name='' />

                        <input type="text" placeholder="Email:" name=''/>

                        <input type="text" placeholder="Identidade:" name='' />

                        <input type="text" placeholder="Sexo:" name='' />

                    </div>
                </section>

                <section>
                    <div className="form-row">

                        <input type="text" placeholder="Número da OAB:" name='' />

                        <input type="text" placeholder="CPF:" name='' />

                        <input type="text" placeholder="Matrícula:" name='' />

                        
                        <input type="text" placeholder="Telefone:" name='' />

                        <Dropdowns /> {/* Tipo Usuário */}
                    </div>
                </section>

                {/* Botões */}
                <div className="form-buttons">
                    <button type="reset" >Descartar</button>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    );
}

export default Form;
