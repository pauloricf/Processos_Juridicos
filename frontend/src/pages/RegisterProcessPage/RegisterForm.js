import React, { useState, useEffect } from 'react';
import styles from './RegisterForm.module.css'; // Alteração para module CSS
import { postProcess } from '../../services/processService';

// Função para formatar datas no padrão ISO 8601
const formatDateToISO = (date) => {
    if (!date) return null;
    return new Date(date).toISOString();
};

function Form() {
    const [formData, setFormData] = useState(() => {
        // Inicializa com dados do Local Storage, se disponíveis
        const savedData = localStorage.getItem('formData');
        return savedData ? JSON.parse(savedData) : {
            Pcss_NumeroProcesso: '',
            Pcss_Siged: '',
            Pcss_Observacoes: '',
            Pcss_Destino: '',
            Pcss_Requerente: '',
            Pcss_Requerido: '',
            Pcss_ValorAcao: '',
            Pcss_DataEmitido: "",
            Pcss_DataVencimento: "",
            tipo: "",
            Pass_Assuntos: "",
            Pjud_Vara: '',
            Pjud_LocalAudiencia: '',
            Pjud_DataAudiencia: '',
            Pjud_DataIntimacao: '',
            categoria: "",
            prazoCorrido: null,
        };
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: name === "prazoCorrido"? value === "true"  :value
        }));
    };

    useEffect(() => {
        // Salva o estado do formulário no Local Storage sempre que ele muda
        localStorage.setItem('formData', JSON.stringify(formData));
        console.log(formData);
        calculateDataVencimento();
    }, [formData.Pcss_DataEmitido, formData.prazo, formData.prazoCorrido]);

    useEffect(() => {
        if(formData.categoria === "outro"){
            setFormData((prevState) => ({
                ...prevState,
                prazo: '',
                prazoCorrido: null
            }));
        }else if(formData.categoria === "mandado_seguranca"){
            setFormData((prevState) => ({
                ...prevState,
                prazo: "30",
                prazoCorrido: true
            }));
        }else if(formData.categoria === "juizado_especial"){
            setFormData((prevState) => ({
                ...prevState,
                prazo: '15',
                prazoCorrido: false
            }));
        }else if(formData.categoria === "acao_ordinaria"){
            setFormData((prevState) => ({
                ...prevState,
                prazo: '30',
                prazoCorrido: false
            }));
        }
    }, [formData.categoria]);


    const isDiaUtil = (data) => {
        const feriados = []
        const diaSemana = data.getDay()
        return diaSemana !== 0 && diaSemana !== 6 && !feriados.includes(data)
    }

    const formatDateToLocalISO = (date) => {
        if (!date) return null;
        // Cria um objeto Date no fuso horário local
        const localDate = new Date(date);
        
        // Ajusta para o formato de data sem UTC, ou seja, sem afetar o fuso horário
        const year = localDate.getFullYear();
        const month = String(localDate.getMonth() + 1).padStart(2, '0');
        const day = String(localDate.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`; 
    };

    const calculateDataVencimento = () =>{
        const dataEmitido = new Date(formData.Pcss_DataEmitido + "T00:00:00")
        const prazo = parseInt(formData.prazo)
        const prazoCorrido = formData.prazoCorrido
        const dataVencimento = new Date(formData.Pcss_DataEmitido + "T00:00:00")
        console.log("dataEmitido", dataEmitido)
        console.log("prazo", prazo)
        console.log("datavencimento inicial ( = dataEmitido)", dataVencimento)

        if(prazoCorrido && prazo > 0){
            dataVencimento.setDate(dataEmitido.getDate() + prazo)
        } else if(!prazoCorrido && prazo > 0){
            let diasAdicionados = 0;

            while(diasAdicionados < prazo){
                dataVencimento.setDate(dataVencimento.getDate() + 1)
                if(isDiaUtil(dataVencimento)){
                    diasAdicionados++
                }
            }
        }
        
        console.log("datavencimento antes", dataVencimento)
        dataVencimento.setHours(23, 59, 59, 999)
        const formattedDataVencimento = formatDateToLocalISO(dataVencimento)
        console.log("datavencimento", dataVencimento)
        console.log("formattedDataVencimento", formattedDataVencimento)

        setFormData((prevState) => ({
            ...prevState,
            Pcss_DataVencimento: formattedDataVencimento
        }))

    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const assuntos = formData.Pass_Assuntos.split(",").map((assunto) => assunto.trim());
            const { Pcss_DataVencimento, ...dataToSend} = {
                ...formData,
                Pjud_DataIntimacao: formatDateToISO(formData.Pjud_DataIntimacao),
                Pjud_DataAudiencia: formatDateToISO(formData.Pjud_DataAudiencia),
                Pcss_DataInicio: formatDateToISO(formData.Pcss_DataInicio),
                Pass_Assuntos: assuntos
            };

            const response = await postProcess(dataToSend);
            console.log(response.status)
            
                alert("Processo cadastrado com sucesso");
                // setFormData({ 
                //     Pcss_NumeroProcesso: '',
                //     Pcss_Siged: '',
                //     Pcss_Observacoes: '',
                //     Pcss_Destino: '',
                //     Pcss_Requerente: '',
                //     Pcss_Requerido: '',
                //     Pcss_ValorAcao: '',
                //     Pcss_DataInicio: "",
                //     prazo: "",
                //     tipo: "",
                //     Pass_Assuntos: "",
                //     Pjud_Vara: '',
                //     Pjud_LocalAudiencia: '',
                //     Pjud_DataAudiencia: '',
                //     Pjud_DataIntimacao: '',
                //     categoria: "",
                // });
                // localStorage.removeItem('formData'); // Limpa o Local Storage
        } catch (error) {
            console.error('Erro ao cadastrar o processo:', error);
        }
    };

    return (
            <div className={styles.form_container}>
            <form onSubmit={handleSubmit}>
                {/* Informações básicas */}
                
                <section>
        
                    <select onChange={handleChange} value={formData.tipo} name="tipo">
                        <option value="">Tipo de processo</option>
                        <option value="pjud">Processo Judicial</option>
                        <option value="pnjud" >Processo não Judicial</option>
                    </select>
                    
                    <h3>Informações básicas:</h3>
                    <div className={styles.form_row}>
                        <div className={styles.form_group}>
                            <label>Siged</label>
                            <input type="text" placeholder="Nº do Siged" name='Pcss_Siged' value={formData.Pcss_Siged} onChange={handleChange} />
                        </div>

                        <div className={styles.form_group}>
                            <label>Nº do processo</label>
                            <input type="text" placeholder="Nº do processo" name='Pcss_NumeroProcesso' value={formData.Pcss_NumeroProcesso} onChange={handleChange}/>
                        </div>

                        <div className={styles.form_group}>
                            <label>Vara</label>
                            <input type="text" placeholder="Vara" name='Pjud_Vara' value={formData.Pjud_Vara} onChange={handleChange} disabled={!(formData.tipo === "pjud")}/>
                        </div>
                        
                        <div className={styles.form_group}>
                            <label>Destino</label>
                            <input type="text" placeholder="Destino" name='Pcss_Destino' value={formData.Pcss_Destino} onChange={handleChange} />
                        </div>
                    </div>
                    <div className={styles.form_row}>
                        <div className={styles.form_group}>
                            <label>Categoria</label>
                            <select onChange={handleChange} value={formData.categoria} name="categoria">
                                <option value=""></option>
                                <option value="acao_ordinaria">Ação Ordinária</option>
                                <option value="juizado_especial">Juizado Especial</option>
                                <option value="mandado_seguranca">Mandado de Segurança</option>
                                <option value="outro">Outro</option>
                            </select>
                        </div>

                        <div className={styles.form_group}>
                            <label>Prazo</label>
                            <input 
                            type="text" placeholder="Prazo" name='prazo' value={formData.prazo} onChange={handleChange}  disabled={!(formData.categoria === "outro")}/>
                        </div>
                        <div className={styles.form_group}>
                            <div className={styles.form_radio}>
                                <input 
                                    type="radio" 
                                    name='prazoCorrido'
                                    value={true} 
                                    onChange={handleChange}
                                    disabled={!(formData.categoria === "outro")}
                                    checked={formData.prazoCorrido}
                                    />
                                    
                                <label>corridos</label>
                            </div>

                            <div className={styles.form_radio}>
                                <input 
                                    type="radio" 
                                    name='prazoCorrido'
                                    value={false}
                                    onChange={handleChange}
                                    disabled={!(formData.categoria === "outro")}
                                    checked={formData.prazoCorrido === false}
                                    />
                                <label>úteis</label>
                            </div>
                        </div>
                        
                        <div className={styles.form_group}>
                            <label>Valor da ação</label>
                            <input type="text" placeholder="Valor do processo" name='Pcss_ValorAcao' value={formData.Pcss_ValorAcao} onChange={handleChange} />
                        </div>
                    </div>
                </section>

                <div className={styles.form_row}>
                    <div className={styles.form_group}>
                        <label>Assuntos</label>
                        <input type='char' placeholder="Assuntos" name='Pass_Assuntos' value={formData.Pass_Assuntos} onChange={handleChange}/>
                    </div>
                </div>
                {/* Datas */}
                <section>
                    <h3 className={styles.h3_datas}>Datas:</h3>
                    <div className={styles.form_row}>
                        <div className={styles.form_group}>
                            <label>Data de Emissão</label>
                            <input type="date" placeholder="Data de emissão" name='Pcss_DataEmitido' value={formData.Pcss_DataEmitido} onChange={handleChange}/>
                        </div>
                        <div className={styles.form_group}>
                            <label>Data de Vencimento</label>
                            <input readOnly type="date" placeholder="Data de Vencimento" name='Pcss_DataVencimento' value={formData.Pcss_DataVencimento} onChange={handleChange}/>
                        </div>
                        <div className={styles.form_group}>
                            <label>Data de Intimação</label>
                            <input type="date" placeholder="Data de intimação" name='Pjud_DataIntimacao' value={formData.Pjud_DataIntimacao} onChange={handleChange} disabled={!(formData.tipo === "pjud")}/>
                        </div>

                        <div className={styles.form_group}>
                            <label>Data da Audiência</label>
                            <input type="date" placeholder="Data da audiência" name='Pjud_DataAudiencia' value={formData.Pjud_DataAudiencia} onChange={handleChange} disabled={!(formData.tipo === "pjud")}/>
                        </div>
                        
                        <div className={styles.form_group}>
                            <label>Local da Audiência</label>
                            <input type="text" placeholder="Local da audiência" name='Pjud_LocalAudiencia' value={formData.Pjud_LocalAudiencia} onChange={handleChange} disabled={!(formData.tipo === "pjud")}/>
                        </div>
                    </div>
                </section>

                {/* Partes Interessadas */}
                <section>
                    <h3>Partes Interessadas:</h3>
                    <div className={styles.form_row}>
                        <div className={styles.form_group}>
                            <label>Requerente</label>
                            <input type="text" placeholder="Requerente" name='Pcss_Requerente' value={formData.Pcss_Requerente} onChange={handleChange} />
                        </div>
                        <div className={styles.form_group}>
                            <label>Requerido</label>
                            <input type="text" placeholder="Requerido" name='Pcss_Requerido' value={formData.Pcss_Requerido} onChange={handleChange} />
                        </div>
                    </div>
                </section>

                {/* Observações */}
                <section>
                    <h3>Observações:</h3>
                    <textarea placeholder="Digite aqui as observações" className={styles.observation} name='Pcss_Observacoes' value={formData.Pcss_Observacoes} onChange={handleChange} ></textarea>
                </section>

                {/* Botões */}
                <div className={styles.form_buttons}>
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
