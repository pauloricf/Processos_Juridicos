import React, { useEffect } from "react";
import styles from "./RegisterForm.module.css";
import { postProcess } from "../../services/processService";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useFeedback } from "../../context/FeedbackContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaProcess } from "../../schemas/processSchema";
import InputNumber from "../../components/inputs/InputNumber";

function Form() {
  const { showFeedback } = useFeedback();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schemaProcess),
    defaultValues: JSON.parse(localStorage.getItem("formData")) || {
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
      Pass_Assuntos: "",
      Pjud_Vara: "",
      Pjud_LocalAudiencia: "",
      Pjud_DataAudiencia: null,
      Pjud_DataIntimacao: null,
      categoria: "",
      prazoCorrido: false,
      prazo: "",
    },
  });

  const tipo = watch("tipo");
  const categoria = watch("categoria");

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      localStorage.setItem("formData", JSON.stringify(value));

      // Atualiza prazo e prazoCorrido baseado na categoria
      if (name === "categoria") {
        switch (value.categoria) {
          case "mandado_seguranca":
            setValue("prazo", "30");
            setValue("prazoCorrido", true);
            break;
          case "juizado_especial":
            setValue("prazo", "15");
            setValue("prazoCorrido", false);
            break;
          case "acao_ordinaria":
            setValue("prazo", "30");
            setValue("prazoCorrido", false);
            break;
          case "outro":
            setValue("prazo", "");
            setValue("prazoCorrido", false);
            break;
          default:
            break;
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const onSubmit = async (data) => {
    try {
      const assuntos = data.Pass_Assuntos?.split(",").map((a) => a.trim()) || [];

      const response = await postProcess({
        ...data,
        prazo: parseInt(data.prazo),
        Pass_Assuntos: assuntos,
      });

      if (response) {
        showFeedback("Processo cadastrado com sucesso!", "success");
        reset();
        localStorage.removeItem("formData");
        navigate("/process");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      showFeedback("Erro ao cadastrar processo. Verifique os dados e tente novamente.", "error");
    }
  };

  return (
    <div className={styles.form_container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Informações básicas */}
        <section>
          <div className={styles.form_group}>
            <select {...register("tipo")}>
              <option value="">Tipo de processo</option>
              <option value="pjud">Processo Judicial</option>
              <option value="pnjud">Processo não Judicial</option>
            </select>
            {errors.tipo && <span className={styles.error}>{errors.tipo.message}</span>}
          </div>

          <h3>Informações básicas:</h3>
          <div className={styles.form_row}>
            <div className={styles.form_group}>
              <div className={styles.label_form}>
                <label>Siged</label>
                <span className="required_asterisk">*</span>
              </div>
              <input
                {...register("Pcss_Siged")}
                placeholder="Nº do Siged"
                onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
              />
              {errors.Pcss_Siged && <span className={styles.error}>{errors.Pcss_Siged.message}</span>}
            </div>

            <div className={styles.form_group}>
              <div className={styles.label_form}>
                <label>No do processo</label>
                <span className="required_asterisk">*</span>
              </div>
              <input
                {...register("Pcss_NumeroProcesso")}
                placeholder="Nº do Processo"
                onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
              />
              {errors.Pcss_NumeroProcesso && <span className={styles.error}>{errors.Pcss_NumeroProcesso.message}</span>}
            </div>

            <div className={styles.form_group}>
              <div className={styles.label_form}>
                <label>Vara</label>
                <span className="required_asterisk">*</span>
                {tipo === "pjud" && <span className="required_asterisk">*</span>}
              </div>
              <input type="text" placeholder="Vara" {...register("Pjud_Vara")} disabled={tipo !== "pjud"} />
              {tipo === "pjud" && errors.Pjud_Vara && <span className={styles.error}>{errors.Pjud_Vara.message}</span>}
            </div>

            <div className={styles.form_group}>
              <div className={styles.label_form}>
                <label>Destino</label>
                <span className="required_asterisk">*</span>
              </div>
              <input type="text" placeholder="Destino" {...register("Pcss_Destino")} />
              {errors.Pcss_Destino && <span className={styles.error}>{errors.Pcss_Destino.message}</span>}
            </div>
          </div>
          <div className={styles.form_row}>
            <div className={styles.form_group}>
              <div className={styles.label_form}>
                <label>Categoria</label>
                <span className="required_asterisk">*</span>
              </div>
              <select {...register("categoria")}>
                <option value=""></option>
                <option value="acao_ordinaria">Ação Ordinária</option>
                <option value="juizado_especial">Juizado Especial</option>
                <option value="mandado_seguranca">Mandado de Segurança</option>
                <option value="outro">Outro</option>
              </select>
              {errors.categoria && <span className={styles.error}>{errors.categoria.message}</span>}
            </div>

            <div className={styles.form_group}>
              <div className={styles.label_form}>
                <label>Prazo</label>
                {categoria === "outro" && <span className="required_asterisk">*</span>}
              </div>
              <input
                type="text"
                placeholder="Prazo"
                {...register("prazo")}
                disabled={categoria !== "outro"}
                onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
              />

              {categoria === "outro" && errors.prazo && <span className={styles.error}>{errors.prazo.message}</span>}
            </div>
            <div className={styles.form_group}>
              <div className={styles.form_radio}>
                <input
                  type="radio"
                  id="prazoCorridoTrue"
                  {...register("prazoCorrido")}
                  value={true}
                  checked={watch("prazoCorrido") === true}
                  disabled={categoria !== "outro"}
                  onChange={() => setValue("prazoCorrido", true)}
                />
                <label htmlFor="prazoCorridoTrue">corridos</label>
              </div>
              <div className={styles.form_radio}>
                <input
                  type="radio"
                  id="prazoCorridoFalse"
                  {...register("prazoCorrido")}
                  value={false}
                  checked={watch("prazoCorrido") === false}
                  disabled={categoria !== "outro"}
                  onChange={() => setValue("prazoCorrido", false)}
                />
                <label htmlFor="prazoCorridoFalse">úteis</label>
              </div>
              {categoria === "outro" && errors.prazoCorrido && (
                <span className={styles.error}>{errors.prazoCorrido.message}</span>
              )}
            </div>

            <div className={styles.form_group}>
              <div className={styles.label_form}>
                <label>Valor da ação</label>
                <span className="required_asterisk">*</span>
              </div>
              <input
                type="text"
                placeholder="Valor da ação"
                {...register("Pcss_ValorAcao")}
                onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
              />
              {errors.Pcss_ValorAcao && <span className={styles.error}>{errors.Pcss_ValorAcao.message}</span>}
            </div>
          </div>
        </section>

        <div className={styles.form_row}>
          <div className={styles.form_group}>
            <label>Assuntos</label>
            <input type="text" placeholder="Assuntos separados por vírgula" {...register("Pass_Assuntos")} />
            {errors.Pass_Assuntos && <span className={styles.error}>{errors.Pass_Assuntos.message}</span>}
          </div>
        </div>

        {/* Datas */}
        <section>
          <h3 className={styles.h3_datas}>Datas:</h3>
          <div className={styles.form_row}>
            <div className={styles.form_group}>
              <div className={styles.label_form}>
                <label>Data de Emissão</label>
                <span className="required_asterisk">*</span>
              </div>
              <input type="date" {...register("Pcss_DataEmitido")} />
              {errors.Pcss_DataEmitido && <span className={styles.error}>{errors.Pcss_DataEmitido.message}</span>}
            </div>
            <div className={styles.form_group}>
              <label>Data de Vencimento</label>
              <input readOnly type="date" {...register("Pcss_DataVencimento")} />
              {isSubmitting && <span className={styles.loading}>Calculando prazo...</span>}
            </div>
            <div className={styles.form_group}>
              <div className={styles.label_form}>
                <label>Data de Intimação</label>
                {tipo === "pjud" && <span className="required_asterisk">*</span>}
              </div>
              <input type="date" {...register("Pjud_DataIntimacao")} disabled={tipo !== "pjud"} />
              {tipo === "pjud" && errors.Pjud_DataIntimacao && (
                <span className={styles.error}>{errors.Pjud_DataIntimacao.message}</span>
              )}
            </div>

            <div className={styles.form_group}>
              <div className={styles.label_form}>
                <label>Data de Audiência</label>
                {tipo === "pjud" && <span className="required_asterisk">*</span>}
              </div>
              <input type="date" {...register("Pjud_DataAudiencia")} disabled={tipo !== "pjud"} />
              {tipo === "pjud" && errors.Pjud_DataAudiencia && (
                <span className={styles.error}>{errors.Pjud_DataAudiencia.message}</span>
              )}
            </div>

            <div className={styles.form_group}>
              <div className={styles.label_form}>
                <label>Local de Audiência</label>
                {tipo === "pjud" && <span className="required_asterisk">*</span>}
              </div>
              <input
                type="text"
                placeholder="Local da audiência"
                {...register("Pjud_LocalAudiencia")}
                disabled={tipo !== "pjud"}
              />
              {tipo === "pjud" && errors.Pjud_LocalAudiencia && (
                <span className={styles.error}>{errors.Pjud_LocalAudiencia.message}</span>
              )}
            </div>
          </div>
        </section>

        {/* Partes Interessadas */}
        <section>
          <h3>Partes Interessadas:</h3>
          <div className={styles.form_row}>
            <div className={styles.form_group}>
              <div className={styles.label_form}>
                <label>Requerente</label>
                <span className="required_asterisk">*</span>
              </div>
              <input type="text" placeholder="Requerente" {...register("Pcss_Requerente")} />
              {errors.Pcss_Requerente && <span className={styles.error}>{errors.Pcss_Requerente.message}</span>}
            </div>
            <div className={styles.form_group}>
              <div className={styles.label_form}>
                <label>Requerido</label>
                <span className="required_asterisk">*</span>
              </div>
              <input type="text" placeholder="Requerido" {...register("Pcss_Requerido")} />
              {errors.Pcss_Requerido && <span className={styles.error}>{errors.Pcss_Requerido.message}</span>}
            </div>
          </div>
        </section>

        {/* Observações */}
        <section>
          <h3>Observações:</h3>
          <textarea placeholder="Digite aqui as observações" className={styles.observation} {...register("Pcss_Observacoes")} />
          {errors.Pcss_Observacoes && <span className={styles.error}>{errors.Pcss_Observacoes.message}</span>}
        </section>

        {/* Botões */}
        <div className={styles.form_buttons}>
          <button type="button" onClick={() => navigate("/process")}>
            Voltar
          </button>
          <button
            type="button"
            onClick={() => {
              reset();
              localStorage.removeItem("formData");
            }}>
            Descartar
          </button>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
