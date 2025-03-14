import { Container, Modal } from "@mui/material";
import React from "react";
import styles from "./ModalViewProcess.module.css";

const ModalViewProcess = ({ open, onClose, process }) => {
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
  console.log("process", process);
  const processType = process?.judiciais ? "Processo Judicial" : "Processo não Judicial";
  const processCategory =
    process?.Pcss_TipoPrazoId === 1
      ? "AO"
      : process?.Pcss_TipoPrazoId === 2
      ? "JE"
      : process?.Pcss_TipoPrazoId === 3
      ? "MS"
      : "Personalizado";

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Container sx={style}>
          <section>
            <select value={process?.tipo} name="tipo">
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
                <input type="text" placeholder="Vara" name="Pjud_Vara" value={process?.Pjud_Vara} disabled />
              </div>

              <div className={styles.form_group}>
                <label>Destino</label>
                <input type="text" placeholder="Destino" name="Pcss_Destino" value={process?.Pcss_Destino} />
              </div>
            </div>
            <div className={styles.form_row}>
              <div className={styles.form_group}>
                <label>Categoria</label>
                <select value={processCategory} name="categoria" disabled={true}>
                  <option value="">{processCategory }</option>
                </select>
              </div>

              <div className={styles.form_group}>
                <label>Prazo</label>
                <input
                  type="text"
                  placeholder="Prazo"
                  name="prazo"
                  value={process?.prazo}
                  disabled={!(process?.categoria === "outro")}
                />
              </div>
              <div className={styles.form_group}>
                <div className={styles.form_radio}>
                  <input
                    type="radio"
                    name="prazoCorrido"
                    value={true}
                    disabled={!(process?.categoria === "outro")}
                    checked={process?.prazoCorrido}
                  />

                  <label>corridos</label>
                </div>

                <div className={styles.form_radio}>
                  <input
                    type="radio"
                    name="prazoCorrido"
                    value={false}
                    disabled={!(process?.categoria === "outro")}
                    checked={process?.prazoCorrido === false}
                  />
                  <label>úteis</label>
                </div>
              </div>

              <div className={styles.form_group}>
                <label>Valor da ação</label>
                <input type="text" placeholder="Valor do processo" name="Pcss_ValorAcao" value={process?.Pcss_ValorAcao} />
              </div>
            </div>
          </section>

          <div className={styles.form_row}>
            <div className={styles.form_group}>
              <label>Assuntos</label>
              <input type="char" placeholder="Assuntos" name="Pass_Assuntos" value={process?.Pass_Assuntos} />
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
                  value={process?.Pcss_DataEmitido}
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
                  value={process?.Pcss_DataVencimento}
                />
              </div>
              <div className={styles.form_group}>
                <label>Data de Intimação</label>
                <input
                  type="date"
                  placeholder="Data de intimação"
                  name="Pjud_DataIntimacao"
                  value={process?.Pjud_DataIntimacao}
                  disabled={!(process?.tipo === "pjud")}
                />
              </div>

              <div className={styles.form_group}>
                <label>Data da Audiência</label>
                <input
                  type="date"
                  placeholder="Data da audiência"
                  name="Pjud_DataAudiencia"
                  value={process?.Pjud_DataAudiencia}
                  disabled={!(process?.tipo === "pjud")}
                />
              </div>

              <div className={styles.form_group}>
                <label>Local da Audiência</label>
                <input
                  type="text"
                  placeholder="Local da audiência"
                  name="Pjud_LocalAudiencia"
                  value={process?.Pjud_LocalAudiencia}
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
                <input type="text" placeholder="Requerente" name="Pcss_Requerente" value={process?.Pcss_Requerente} />
              </div>
              <div className={styles.form_group}>
                <label>Requerido</label>
                <input type="text" placeholder="Requerido" name="Pcss_Requerido" value={process?.Pcss_Requerido} />
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
              value={process?.Pcss_Observacoes}></textarea>
          </section>
        </Container>
      </Modal>
    </>
  );
};

export default ModalViewProcess;
