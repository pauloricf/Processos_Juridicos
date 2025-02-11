const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const cron = require('node-cron');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

const calcularDiasUteisRestantes = async(dataVencimento) => {
  const today = new Date()
  today.setUTCHours(0,0,0,0)

  let diasRestantes = 0;
  let dataAtual = new Date(today)

  while (dataAtual < dataVencimento){
    dataAtual.setUTCDate(dataAtual.getUTCDate() + 1);

    const isDiaUtil = 
      dataAtual.getUTCDay() !== 0 &&
      dataAtual.getUTCDay() !== 6

    if (isDiaUtil) diasRestantes++
  }
  console.log(diasRestantes)
  return diasRestantes
}

const verificarPrazos =  async() => {
  console.log("Verificando prazos...")
  try {
    const processos = await prisma.processos.findMany({
      where: {
        Pcss_Status: {not: "Vencido"},
      },
      include: {
        Pcss_Procuradores: {
          include: {usuario: true}
        }
      }
    })

    for (const processo of processos){
      const dataVencimento = new Date(processo.Pcss_DataVencimento);
      const hojeUTC = new Date();
      hojeUTC.setUTCHours(0, 0, 0, 0); // Normaliza para comparação

      // Verificação direta de vencimento
      if (dataVencimento < hojeUTC) {
        await prisma.processos.update({
          where: { id: processo.id },
          data: { Pcss_Status: "VENCIDO" }
        });
        
        console.log(`Processo ${processo.Pcss_NumeroProcesso} marcado como VENCIDO`);
        continue;
      }

      const diasRestantes = await calcularDiasUteisRestantes(
        new Date(processo.Pcss_DataVencimento)
      );

      if ([10, 8, 5].includes(diasRestantes)){
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: processo.Pcss_Procuradores.usuario.Usua_Email,
          subject: `Alerta de Prazo - Processo ${processo.Pcss_NumeroProcesso}`,
          text: `Faltam ${diasRestantes} dias úteis para o vencimento do processo!\n\n`
              + `Detalhes:\n`
              + `Número: ${processo.Pcss_NumeroProcesso}\n`
              + `Requerente: ${processo.Pcss_Requerente}\n`
              + `Vencimento: ${processo.Pcss_DataVencimento.toLocaleDateString('pt-BR')}`
        }
        await transporter.sendMail(mailOptions);
        console.log(`Alerta enviado para ${processo.Pcss_Procuradores.usuario.Usua_Email}`);

        if (diasRestantes <= 0) {
          await prisma.processos.update({
            where: { id: processo.id },
            data: { Pcss_Status: "VENCIDO" }
          });
        } 
      }
    }
  } catch (error) {
    console.log("Erro na verificação dos prazos: ", error)
  }
}

const iniciarMonitoramento = () => {
  console.log("Iniciando monitoramento de prazos...")
  cron.schedule('0 12 * * *', verificarPrazos, {
    scheduled: true,
    timezone: "UTC"
  });
  console.log("Monitoramento de prazos finalizado")
};

module.exports = { iniciarMonitoramento };