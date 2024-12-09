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
        Pcss_Observacoes: '',
        Pass_Assuntos
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
                    Pcss_Observacoes: '',
                    Pass_Assuntos
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
                <section>
                    <h2>Informações básicas:</h2>
                    <div className="form-row">
                        <input type="text" placeholder="Nº do Siged" name='Pcss_Siged' value={formData.Pcss_Siged} onChange={handleChange} />

                        <input type="text" placeholder="Nº do processo" name='Pcss_NumeroProcesso' value={formData.Pcss_NumeroProcesso} onChange={handleChange}/>

                        <input type="text" placeholder="Vara" name='Pjud_Vara' value={formData.Pjud_Vara} onChange={handleChange} />

                        <input type="text" placeholder="Destino" name='Pcss_Destino' value={formData.Pcss_Destino} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <Dropdowns /> {/* Para fazer a categoria de Processos Judiciais e Não Judiciais */}

                        <input type="text" placeholder="Valor do processo" name='Pcss_ValorAcao' value={formData.Pcss_ValorAcao} onChange={handleChange} />
                    </div>
                </section>

                {/* Datas */}
                <section>
                    <h2>Datas:</h2>
                    <div className="form-row">

                        <p>Data de Intimação</p>
                        <input type="date" placeholder="Data de intimação" name='Pjud_DataIntimacao' value={formData.Pjud_DataIntimacao} onChange={handleChange} />

                        <p>Data da Audiência</p>
                        <input type="date" placeholder="Data da audiência" name='Pjud_DataAudiencia' value={formData.Pjud_DataAudiencia} onChange={handleChange} />

                        <input type="text" placeholder="Local da audiência" name='Pjud_LocalAudiencia' value={formData.Pjud_LocalAudiencia} onChange={handleChange} />
                    </div>
                </section>
                    <div className="form-row">
                        <p>Assunto</p>
                        <input type='char' placeholder="Assuntos" name='Pass_Assunntos' value={formData.Pass_Assuntos} onChange={handleChange}/>

                        <Dropdowns />
                    </div>
                <section>

                </section>

                {/* Partes Interessadas */}
                <section>
                    <h2>Partes Interessadas:</h2>
                    <div className="form-row">
                        <input type="text" placeholder="Requerente" name='Pcss_Requerente' value={formData.Pcss_Requerente} onChange={handleChange} />
                        <input type="text" placeholder="Requerido" name='Pcss_Requerido' value={formData.Pcss_Requerido} onChange={handleChange} />
                    </div>
                </section>

                {/* Observações */}
                <section>
                    <h2>Observações:</h2>
                    <textarea placeholder="Digite aqui as observações" className='observation' name='Pcss_Observacoes' value={formData.Pcss_Observacoes} onChange={handleChange} ></textarea>
                </section>

                {/* Botões */}
                <div className="form-buttons">
                    <button type="reset" onClick={() => setFormData({ 
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
                    })}>Descartar</button>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    );
}

export default Form;
