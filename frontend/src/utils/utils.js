export const formatDateBR = (dataISO) => {
  const data = new Date(dataISO);

  // Ajustando a data para somar um dia, se necessário
  data.setUTCDate(data.getUTCDate() + 1);

  return data.toLocaleDateString("pt-BR");
};
