import React, { useEffect, useState } from "react";
import styles from "./EditForm.module.css";
import { getProcessById, updateProcess } from "../../services/processService";
import ModalDocuments from "./ModalDocuments";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EditForm = ({ id }) => {
  console.log(id);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const navigate = useNavigate();

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSeverity(type);
    setOpenSnackbar(true);
  };

  const [severity, setSeverity] = useState("success");
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const [formData, setFormData] = useState({
    Pcss_NumeroProcesso: "",
    Pcss_Siged: "",
    Pcss_Observacoes: "",
    Pcss_Destino: "",
    Pcss_Requerente: "",
    Pcss_Requerido: "",
    Pcss_ValorAcao: "",
    Pcss_DataEmitido: "",
    Pcss_DataVencimento: "",
    tipo: "",
    assuntos: [],
    Pjud_Vara: "",
    Pjud_LocalAudiencia: "",
    Pjud_DataAudiencia: "",
    Pjud_DataIntimacao: "",
    categoria: "",
    prazoCorrido: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProcessById(id);
      console.log(data);
      if (data) {
        setFormData({
          Pcss_NumeroProcesso: data.Pcss_NumeroProcesso || "",
          Pcss_Siged: data.Pcss_Siged || "",
          Pcss_Observacoes: data.Pcss_Observacoes || "",
          Pcss_Destino: data.Pcss_Destino || "",
          Pcss_Requerente: data.Pcss_Requerente || "",
          Pcss_Requerido: data.Pcss_Requerido || "",
          Pcss_ValorAcao: data.Pcss_ValorAcao || "",
          Pcss_DataEmitido: data.Pcss_DataEmitido.split("T")[0] || "",
          Pcss_DataVencimento: data.Pcss_DataVencimento.split("T")[0] || "",
          tipo: data.judiciais ? "pjud" : "pnjud",
          Pass_Assuntos: data.assuntos.map((assunto) => assunto.Pass_Assunto).join(", ") || "",
          Pjud_Vara: data.Pjud_Vara || "",
          Pjud_LocalAudiencia: data.Pjud_LocalAudiencia || "",
          Pjud_DataAudiencia: data.Pjud_DataAudiencia || "",
          Pjud_DataIntimacao: data.Pjud_DataIntimacao || "",
          categoria: data.Pcss_TipoPrazo.Tpraz_Tipo,
          prazoCorrido: data.Pcss_TipoPrazo.Tpraz_corrido ? true : false,
        });
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (formData.categoria) {
      setFormData((prevState) => {
        if (prevState.categoria === "outro") {
          return { ...prevState, prazo: "", prazoCorrido: null };
        } else if (prevState.categoria === "mandado_seguranca") {
          return { ...prevState, prazo: "30", prazoCorrido: true };
        } else if (prevState.categoria === "juizado_especial") {
          return { ...prevState, prazo: "15", prazoCorrido: false };
        } else if (prevState.categoria === "acao_ordinaria") {
          return { ...prevState, prazo: "30", prazoCorrido: false };
        }
        return prevState;
      });
    }
  }, [formData.categoria]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "prazoCorrido" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const assuntos = formData.Pass_Assuntos.split(",").map((a) => a.trim());
    console.log("assuntos", assuntos);
    const response = await updateProcess(id, {
      ...formData,
      Pass_Assuntos: assuntos,
      Pcss_ValorAcao: parseFloat(formData.Pcss_ValorAcao.replace(/\./g, "").replace(",", ".")),
    });
    console.log(response);
  };
  console.log("formdata", formData);
  return (
    <div className={styles.form_container}>
      <form onSubmit={handleSubmit}>
        {/* Informações básicas */}

        <section>
          <select onChange={handleChange} value={formData.tipo} name="tipo" disabled>
            <option value="">Tipo de processo</option>
            <option value="pjud">Processo Judicial</option>
            <option value="pnjud">Processo não Judicial</option>
          </select>

          <h3>Informações básicas:</h3>
          <div className={styles.form_row}>
            <div className={styles.form_group}>
              <label>Siged</label>
              <input
                type="text"
                placeholder="Nº do Siged"
                name="Pcss_Siged"
                value={formData.Pcss_Siged}
                onChange={handleChange}
              />
            </div>

            <div className={styles.form_group}>
              <label>Nº do processo</label>
              <input
                type="text"
                placeholder="Nº do processo"
                name="Pcss_NumeroProcesso"
                value={formData.Pcss_NumeroProcesso}
                onChange={handleChange}
              />
            </div>

            <div className={styles.form_group}>
              <label>Vara</label>
              <input
                type="text"
                placeholder="Vara"
                name="Pjud_Vara"
                value={formData.Pjud_Vara}
                onChange={handleChange}
                disabled={!(formData.tipo === "pjud")}
              />
            </div>

            <div className={styles.form_group}>
              <label>Destino</label>
              <input
                type="text"
                placeholder="Destino"
                name="Pcss_Destino"
                value={formData.Pcss_Destino}
                onChange={handleChange}
              />
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
                type="text"
                placeholder="Prazo"
                name="prazo"
                value={formData.prazo}
                onChange={handleChange}
                disabled={!(formData.categoria === "outro")}
              />
            </div>
            <div className={styles.form_group}>
              <div className={styles.form_radio}>
                <input
                  type="radio"
                  name="prazoCorrido"
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
                  name="prazoCorrido"
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
              <input
                type="text"
                placeholder="Valor do processo"
                name="Pcss_ValorAcao"
                value={formData.Pcss_ValorAcao}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        <div className={styles.form_row}>
          <div className={styles.form_group}>
            <label>Assuntos</label>
            <input
              type="char"
              placeholder="Assuntos"
              name="Pass_Assuntos"
              value={formData.Pass_Assuntos}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Datas */}
        <section>
          <h3 className={styles.h3_datas}>Datas:</h3>
          <div className={styles.form_row}>
            <div className={styles.form_group}>
              <label>Data de Emissão</label>
              <input
                type="date"
                placeholder="Data de emissão"
                name="Pcss_DataEmitido"
                value={formData.Pcss_DataEmitido}
                onChange={handleChange}
                disabled={true}
              />
            </div>
            <div className={styles.form_group}>
              <label>Data de Vencimento</label>
              <input
                readOnly
                type="date"
                placeholder="Data de Vencimento"
                name="Pcss_DataVencimento"
                value={formData.Pcss_DataVencimento}
                onChange={handleChange}
              />
            </div>
            <div className={styles.form_group}>
              <label>Data de Intimação</label>
              <input
                type="date"
                placeholder="Data de intimação"
                name="Pjud_DataIntimacao"
                value={formData.Pjud_DataIntimacao}
                onChange={handleChange}
                disabled={!(formData.tipo === "pjud")}
              />
            </div>

            <div className={styles.form_group}>
              <label>Data da Audiência</label>
              <input
                type="date"
                placeholder="Data da audiência"
                name="Pjud_DataAudiencia"
                value={formData.Pjud_DataAudiencia}
                onChange={handleChange}
                disabled={!(formData.tipo === "pjud")}
              />
            </div>

            <div className={styles.form_group}>
              <label>Local da Audiência</label>
              <input
                type="text"
                placeholder="Local da audiência"
                name="Pjud_LocalAudiencia"
                value={formData.Pjud_LocalAudiencia}
                onChange={handleChange}
                disabled={!(formData.tipo === "pjud")}
              />
            </div>
          </div>
        </section>

        {/* Partes Interessadas */}
        <section>
          <h3>Partes Interessadas:</h3>
          <div className={styles.form_row}>
            <div className={styles.form_group}>
              <label>Requerente</label>
              <input
                type="text"
                placeholder="Requerente"
                name="Pcss_Requerente"
                value={formData.Pcss_Requerente}
                onChange={handleChange}
              />
            </div>
            <div className={styles.form_group}>
              <label>Requerido</label>
              <input
                type="text"
                placeholder="Requerido"
                name="Pcss_Requerido"
                value={formData.Pcss_Requerido}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* Observações */}
        <section>
          <h3>Observações:</h3>
          <textarea
            placeholder="Digite aqui as observações"
            className={styles.observation}
            name="Pcss_Observacoes"
            value={formData.Pcss_Observacoes}
            onChange={handleChange}></textarea>
        </section>

        {/* Botões */}
        <div className={styles.form_buttons}>
          <button type="button" onClick={() => navigate("/process")}>
            Voltar
          </button>
          <button type="button" onClick={handleOpenModal}>
            Documentos
          </button>
          <button
            type="reset"
            onClick={() =>
              setFormData({
                Pcss_NumeroProcesso: "",
                Pcss_Siged: "",
                Pjud_Vara: "",
                Pcss_Destino: "",
                Pcss_ValorAcao: "",
                Pjud_DataIntimacao: "",
                Pjud_DataAudiencia: "",
                Pjud_LocalAudiencia: "",
                Pcss_Requerente: "",
                Pcss_Requerido: "",
                Pcss_Observacoes: "",
              })
            }>
            Descartar
          </button>
          <button type="submit">Atualizar</button>
        </div>
      </form>
      <ModalDocuments open={modalOpen} onClose={handleCloseModal} showSnackbar={handleOpenSnackbar} />
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={severity} sx={{ width: "100%" }} variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EditForm;
