import React, { useEffect, useState } from 'react'
import styles from './EditForm.module.css';
import { getProcessById, updateProcess } from '../../services/processService';
import ModalDocuments from './ModalDocuments';

const EditForm = ({id}) => {
  console.log(id)
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  // const [Danex_Nome, setDanex_Nome] = useState('');
  // const [Danex_Usuario, setDanex_Usuario] = useState('');
  const [formData, setFormData] = useState({
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
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProcessById(id)
      console.log(data)
      if (data) {
        setFormData({
          Pcss_NumeroProcesso: data.Pcss_NumeroProcesso || '',
          Pcss_Siged: data.Pcss_Siged || '',
          Pcss_Observacoes: data.Pcss_Observacoes || '',
          Pcss_Destino: data.Pcss_Destino || '',
          Pcss_Requerente: data.Pcss_Requerente || '',
          Pcss_Requerido: data.Pcss_Requerido || '',
          Pcss_ValorAcao: data.Pcss_ValorAcao || '',
          Pcss_DataEmitido: data.Pcss_DataEmitido.split("T")[0] || '',
          Pcss_DataVencimento: data.Pcss_DataVencimento.split("T")[0] || '',
          tipo: data.judiciais ? "pjud" : "pnjud",
          Pass_Assuntos: data.Pass_Assuntos || '',
          Pjud_Vara: data.Pjud_Vara || '',
          Pjud_LocalAudiencia: data.Pjud_LocalAudiencia || '',
          Pjud_DataAudiencia: data.Pjud_DataAudiencia || '',
          Pjud_DataIntimacao: data.Pjud_DataIntimacao || '',
          categoria: data.Pcss_TipoPrazo.Tpraz_Tipo,
          prazoCorrido: data.Pcss_TipoPrazo.Tpraz_corrido? true : false,
        });
      }
    }

    fetchData()
    
  }, [id])

  useEffect(() => {
          console.log(formData.categoria)
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
          console.log(formData)
      }, [formData.categoria]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
        ...prevState,
        [name]: name === "prazoCorrido"? value === "true" : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateProcess(id, formData)
    console.log(response)
  }

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
                    <select onChange={handleChange} value={formData.categoria} name="categoria" disabled={true}>
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
                    <input type="date" placeholder="Data de emissão" name='Pcss_DataEmitido' value={formData.Pcss_DataEmitido} onChange={handleChange} disabled={true}/>
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
            <button type='button' onClick={handleOpenModal}>Documentos</button>
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

                    
                        
            {/* <input
                type="text"
                placeholder="Nome"
                value={Danex_Nome}
                onChange={(e) => setDanex_Nome(e.target.value)}
            /> */}
            {/* <input
                type="text"
                placeholder="Usuário"
                value={Danex_Usuario}
                onChange={(e) => setDanex_Usuario(e.target.value)}
            /> */}
            {/* <input
                type="text"
                placeholder="Número do Processo"
                value={Danex_NumeroProcesso_id}
                onChange={(e) => setDanex_NumeroProcesso_id(e.target.value)}
            />
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Enviar Documento</button> */}
        </form>
        <ModalDocuments open={modalOpen} onClose={handleCloseModal}/>
 
    </div>
  )
}

export default EditForm