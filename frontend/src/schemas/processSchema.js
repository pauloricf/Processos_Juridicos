import * as yup from "yup";

export const schemaProcess = yup.object().shape({
  Pcss_NumeroProcesso: yup.string().required("Número do processo é obrigatório"),
  Pcss_Siged: yup.string().required("Siged é obrigatório"),
  Pcss_Observacoes: yup.string(),
  Pcss_Destino: yup.string().required("Destino é obrigatório"),
  Pcss_ValorAcao: yup.string().required("Valor da ação é obrigatório"),
  categoria: yup.string().required("Categoria é obrigatória"),
  Pjud_Vara: yup.string().when("tipo", {
    is: (val) => val === "pjud",
    then: (schema) => schema.required("Vara é obrigatória para processo judicial"),
  }),
  Pjud_LocalAudiencia: yup.string(),
  Pjud_DataAudiencia: yup.date().nullable(),
  Pjud_DataIntimacao: yup.date().nullable(),
  Pass_Assuntos: yup.string(),
  Pcss_Requerente: yup.string().required("Requerente é obrigatório"),
  Pcss_Requerido: yup.string().required("Requerido é obrigatório"),
  Pcss_DataEmitido: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Data de emissão é obrigatória"),
  tipo: yup.string().required("Tipo de processo é obrigatório"),
  prazo: yup.string().when("categoria", {
    is: (val) => val === "outro",
    then: (schema) => schema.required("Prazo é obrigatório"),
  }),
  prazoCorrido: yup.boolean().when("categoria", {
    is: (val) => val === "outro",
    then: (schema) => schema.required("Tipo de prazo é obrigatório"),
  }),
});
