import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./ModalViewProcess.module.css";
import { getDocumentsByProcessId } from "../../services/documentService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ModalViewProcess = ({ open, onClose, process, prazo, handleConcludeProcess }) => {
  const [showDocuments, setShowDocuments] = useState(false);
  const [documents, setDocuments] = useState([]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "90%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflowY: "auto",
  };
  const [openConfirm, setOpenConfirm] = useState(false);
  console.log("process", process);
  const formattedAssuntos = process?.assuntos ? process.assuntos.map((assunto) => assunto.Pass_Assunto).join(", ") : "";
  const processType = process?.judiciais ? "Processo Judicial" : "Processo não Judicial";
  const processCategory =
    process?.Pcss_TipoPrazoId === 1
      ? "AO"
      : process?.Pcss_TipoPrazoId === 2
      ? "JE"
      : process?.Pcss_TipoPrazoId === 3
      ? "MS"
      : "Personalizado";

  const fetchDocuments = async () => {
    try {
      const response = await getDocumentsByProcessId(process.id);
      setDocuments(response || []);
      console.log("documents", response);
    } catch (error) {
      console.log(error);
    }
  };
  const toggleDocuments = () => {
    setShowDocuments(!showDocuments);
  };

  const handleDelete = async (id) => {
    try {
      // await deleteDocument(id);
      setDocuments(documents.filter((doc) => doc.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("showDocuments", showDocuments);
    if (showDocuments) {
      fetchDocuments();
    }
  }, [showDocuments]);
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Container sx={style} className={styles.modal}>
          <section>
            <select value={process?.tipo} name="tipo" disabled>
              <option value="">{processType}</option>
            </select>

            <h3>Informações básicas:</h3>
            <div className={styles.form_row}>
              <div className={styles.form_group}>
                <label>Siged</label>
                <input type="text" placeholder="Nº do Siged" name="Pcss_Siged" value={process?.Pcss_Siged} disabled="true" />
              </div>

              <div className={styles.form_group}>
                <label>Nº do processo</label>
                <input
                  type="text"
                  placeholder="Nº do processo"
                  name="Pcss_NumeroProcesso"
                  value={process?.Pcss_NumeroProcesso}
                  disabled
                />
              </div>

              <div className={styles.form_group}>
                <label>Vara</label>
                <input type="text" placeholder="Vara" name="Pjud_Vara" value={process?.judiciais?.Pjud_Vara} disabled />
              </div>

              <div className={styles.form_group}>
                <label>Destino</label>
                <input type="text" placeholder="Destino" name="Pcss_Destino" value={process?.Pcss_Destino} disabled />
              </div>
            </div>
            <div className={styles.form_row}>
              <div className={styles.form_group}>
                <label>Categoria</label>
                <select value={processCategory} name="categoria" disabled={true}>
                  <option value="">{processCategory}</option>
                </select>
              </div>

              <div className={styles.form_group}>
                <label>Prazo</label>
                <input type="text" placeholder="Prazo" name="prazo" value={prazo} disabled={!(process?.categoria === "outro")} />
              </div>
              <div className={styles.form_group}>
                <div className={styles.form_radio}>
                  <input type="radio" name="prazoCorrido" value={true} disabled checked={process?.Pcss_TipoPrazo.Tpraz_Corrido} />

                  <label>corridos</label>
                </div>

                <div className={styles.form_radio}>
                  <input
                    type="radio"
                    name="prazoCorrido"
                    value={false}
                    disabled
                    checked={process?.Pcss_TipoPrazo.Tpraz_Corrido === false}
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
                  value={process?.Pcss_ValorAcao}
                  disabled
                />
              </div>
            </div>
          </section>

          <div className={styles.form_row}>
            <div className={styles.form_group}>
              <label>Assuntos</label>
              <input type="char" placeholder="Assuntos" name="Pass_Assuntos" value={formattedAssuntos} disabled />
            </div>
          </div>
          {/* Datas */}
          {showDocuments ? (
            <section>
              <h3>Documentos:</h3>
              {documents.length > 0 ? (
                <ul>
                  {documents.map((doc) => (
                    <li key={doc.id} className={styles.documentItem}>
                      <span>{doc.Danex_Nome}</span>
                      <a
                        href={`http://localhost:3035/${doc.Danex_Documento}`}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.btnDownload}>
                        Baixar
                      </a>
                      <button className={styles.btnDelete} onClick={() => handleDelete(doc.id)}>
                        Deletar
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nenhum documento encontrado.</p>
              )}
            </section>
          ) : (
            <>
              <section>
                <h3 className={styles.h3_datas}>Datas:</h3>
                <div className={styles.form_row}>
                  <div className={styles.form_group}>
                    <label>Data de Emissão</label>
                    <input
                      type="date"
                      placeholder="Data de emissão"
                      name="Pcss_DataEmitido"
                      value={process?.Pcss_DataEmitido.split("T")[0]}
                      disabled
                    />
                  </div>
                  <div className={styles.form_group}>
                    <label>Data de Vencimento</label>
                    <input
                      readOnly
                      type="date"
                      placeholder="Data de Vencimento"
                      name="Pcss_DataVencimento"
                      value={process?.Pcss_DataVencimento.split("T")[0]}
                    />
                  </div>
                  <div className={styles.form_group}>
                    <label>Data de Intimação</label>
                    <input
                      type="date"
                      placeholder="Data de intimação"
                      name="Pjud_DataIntimacao"
                      value={process?.judiciais?.Pjud_DataIntimacao.split("T")[0]}
                      disabled={!(process?.tipo === "pjud")}
                    />
                  </div>

                  <div className={styles.form_group}>
                    <label>Data da Audiência</label>
                    <input
                      type="date"
                      placeholder="Data da audiência"
                      name="Pjud_DataAudiencia"
                      value={process?.judiciais?.Pjud_DataAudiencia.split("T")[0]}
                      disabled={!(process?.tipo === "pjud")}
                    />
                  </div>

                  <div className={styles.form_group}>
                    <label>Local da Audiência</label>
                    <input
                      type="text"
                      placeholder="Local da audiência"
                      name="Pjud_LocalAudiencia"
                      value={process?.judiciais?.Pjud_LocalAudiencia}
                      disabled={!(process?.tipo === "pjud")}
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
                      value={process?.Pcss_Requerente}
                      disabled
                    />
                  </div>
                  <div className={styles.form_group}>
                    <label>Requerido</label>
                    <input type="text" placeholder="Requerido" name="Pcss_Requerido" value={process?.Pcss_Requerido} disabled />
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
                  value={process?.Pcss_Observacoes}
                  disabled></textarea>
              </section>
            </>
          )}

          {/* Botões de Ação */}
          <div className={styles.buttons}>
            <button className={styles.btn} onClick={toggleDocuments}>
              Documentos
            </button>
            <button className={styles.btn} onClick={() => setOpenConfirm(true)}>
              Concluir
            </button>
          </div>
          <>
            <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
              <DialogTitle>Tem certeza?</DialogTitle>
              <DialogContent>Deseja realmente concluir este processo?</DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenConfirm(false)}>Cancelar</Button>
                <Button onClick={handleConcludeProcess} color="primary">
                  Confirmar
                </Button>
              </DialogActions>
            </Dialog>
          </>
        </Container>
      </Modal>
    </>
  );
};

export default ModalViewProcess;
