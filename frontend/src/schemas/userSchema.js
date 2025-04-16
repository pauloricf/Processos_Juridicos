import * as yup from "yup";

export const schemaUser = yup.object().shape({
  fullName: yup.string().required("Nome completo é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  rg: yup.string().required("RG é obrigatório"),
  cpf: yup
    .string()
    .required("CPF é obrigatório")
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato inválido (000.000.000-00)"),
  matricula: yup.string().required("Matrícula é obrigatória"),
  birthday: yup
    .date()
    .nullable()
    .required("Data de nascimento é obrigatória")
    .max(new Date(), "Data não pode ser futura")
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
  sex: yup.string().required("Sexo é obrigatório"),
  position: yup.string().required("Cargo é obrigatório"),
  numeroOab: yup.string().when("position", {
    is: (val) => val === "ProcuradorGeral" || val === "ProcuradorEfetivo",
    then: (schema) => schema.required("Número da OAB é obrigatório."),
    otherwise: (schema) => schema.notRequired(),
  }),
  phone: yup.string().nullable(),
});
