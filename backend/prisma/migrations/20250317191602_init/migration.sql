-- CreateTable
CREATE TABLE "Usuarios" (
    "id" SERIAL NOT NULL,
    "Usua_Matricula" VARCHAR(11) NOT NULL,
    "Usua_Nome" VARCHAR(100) NOT NULL,
    "Usua_Email" VARCHAR(84) NOT NULL,
    "Usua_Senha" VARCHAR(80) NOT NULL,
    "Usua_CPF" CHAR(11) NOT NULL,
    "Usua_TipoUsuario" CHAR(17) NOT NULL,
    "Usua_Identidade" VARCHAR(14) NOT NULL,
    "Usua_Telefone" CHAR(11) NOT NULL,
    "Usua_Sexo" CHAR(9) NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calendario" (
    "id" SERIAL NOT NULL,
    "Cale_Data" DATE NOT NULL,
    "Cale_DiaSemana" CHAR(7) NOT NULL,
    "Cale_TipoData" CHAR(15) NOT NULL,

    CONSTRAINT "Calendario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Licencas" (
    "id" SERIAL NOT NULL,
    "Lice_Motivo" VARCHAR(150) NOT NULL,
    "Lice_DataFim" DATE NOT NULL,
    "Lice_DataInicio" DATE NOT NULL,
    "Lice_Usuario_id" INTEGER,

    CONSTRAINT "Licencas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalendarioAlteracoes" (
    "id" SERIAL NOT NULL,
    "Calt_Data" DATE NOT NULL,
    "Calt_Motivo" VARCHAR(100) NOT NULL,
    "Calt_Tipo" VARCHAR(15) NOT NULL,
    "Calt_Usuario_id" INTEGER NOT NULL,

    CONSTRAINT "CalendarioAlteracoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Procuradores" (
    "id" SERIAL NOT NULL,
    "Pcrd_NumeroOAB" CHAR(11) NOT NULL,
    "Pcrd_Cargo" VARCHAR(7) NOT NULL,
    "Pcrd_Usuario_id" INTEGER NOT NULL,

    CONSTRAINT "Procuradores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Processos" (
    "id" SERIAL NOT NULL,
    "Pcss_NumeroProcesso" CHAR(25) NOT NULL,
    "Pcss_Siged" CHAR(22) NOT NULL,
    "Pcss_ValorAcao" DOUBLE PRECISION NOT NULL,
    "Pcss_DataInicio" DATE NOT NULL,
    "Pcss_Status" VARCHAR(20) NOT NULL,
    "Pcss_Observacoes" TEXT,
    "Pcss_Destino" CHAR(15),
    "Pcss_Requerente" VARCHAR(100) NOT NULL,
    "Pcss_Requerido" VARCHAR(100),
    "Pcss_DataEmitido" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Pcss_DataVencimento" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Pcss_TipoPrazoId" INTEGER,
    "Pcss_Procurador_id" INTEGER,
    "TransferenciaId" INTEGER,

    CONSTRAINT "Processos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcJudiciais" (
    "id" SERIAL NOT NULL,
    "Pjud_Vara" VARCHAR(100) NOT NULL,
    "Pjud_LocalAudiencia" VARCHAR(100),
    "Pjud_DataAudiencia" DATE,
    "Pjud_DataIntimacao" DATE,
    "Pjud_NumeroProcesso_id" INTEGER NOT NULL,

    CONSTRAINT "ProcJudiciais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcAssuntos" (
    "id" SERIAL NOT NULL,
    "Pass_Assunto" VARCHAR(150) NOT NULL,
    "Pass_NumeroProcesso_id" INTEGER NOT NULL,

    CONSTRAINT "ProcAssuntos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TiposPrazos" (
    "id" SERIAL NOT NULL,
    "Tpraz_Tipo" VARCHAR(50) NOT NULL,
    "Tpraz_Dias" INTEGER NOT NULL,
    "Tpraz_Corrido" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TiposPrazos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentosAnexados" (
    "id" SERIAL NOT NULL,
    "Danex_Data" DATE NOT NULL,
    "Danex_Nome" VARCHAR(100) NOT NULL,
    "Danex_Documento" VARCHAR(255) NOT NULL,
    "Danex_Usuario" INTEGER,
    "Danex_NumeroProcesso_id" INTEGER NOT NULL,

    CONSTRAINT "DocumentosAnexados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transferencias" (
    "id" SERIAL NOT NULL,
    "Tran_Data" DATE NOT NULL,
    "Tran_Motivo" VARCHAR(150) NOT NULL,
    "Tran_Status" VARCHAR(50) NOT NULL DEFAULT 'Pendente',
    "Tran_UsuarioOrigem_id" INTEGER NOT NULL,
    "Tran_ProcuradorDestino_id" INTEGER NOT NULL,

    CONSTRAINT "Transferencias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcMovimentacoes" (
    "id" SERIAL NOT NULL,
    "Pmov_Despacho" VARCHAR(50) NOT NULL,
    "Pmov_Publicacao" VARCHAR(50) NOT NULL,
    "Pmov_Providencia" VARCHAR(50) NOT NULL,
    "Pmov_Data" DATE NOT NULL,
    "Pmov_Procuradores_id" INTEGER NOT NULL,
    "Pmov_NumeroProcesso_id" INTEGER NOT NULL,

    CONSTRAINT "ProcMovimentacoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_Usua_Matricula_key" ON "Usuarios"("Usua_Matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_Usua_Email_key" ON "Usuarios"("Usua_Email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_Usua_CPF_key" ON "Usuarios"("Usua_CPF");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_Usua_Identidade_key" ON "Usuarios"("Usua_Identidade");

-- CreateIndex
CREATE UNIQUE INDEX "Calendario_Cale_Data_key" ON "Calendario"("Cale_Data");

-- CreateIndex
CREATE UNIQUE INDEX "ProcJudiciais_Pjud_NumeroProcesso_id_key" ON "ProcJudiciais"("Pjud_NumeroProcesso_id");

-- AddForeignKey
ALTER TABLE "Licencas" ADD CONSTRAINT "Licencas_Lice_Usuario_id_fkey" FOREIGN KEY ("Lice_Usuario_id") REFERENCES "Usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarioAlteracoes" ADD CONSTRAINT "CalendarioAlteracoes_Calt_Usuario_id_fkey" FOREIGN KEY ("Calt_Usuario_id") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Procuradores" ADD CONSTRAINT "Procuradores_Pcrd_Usuario_id_fkey" FOREIGN KEY ("Pcrd_Usuario_id") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Processos" ADD CONSTRAINT "Processos_Pcss_TipoPrazoId_fkey" FOREIGN KEY ("Pcss_TipoPrazoId") REFERENCES "TiposPrazos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Processos" ADD CONSTRAINT "Processos_Pcss_Procurador_id_fkey" FOREIGN KEY ("Pcss_Procurador_id") REFERENCES "Procuradores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Processos" ADD CONSTRAINT "Processos_TransferenciaId_fkey" FOREIGN KEY ("TransferenciaId") REFERENCES "Transferencias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcJudiciais" ADD CONSTRAINT "ProcJudiciais_Pjud_NumeroProcesso_id_fkey" FOREIGN KEY ("Pjud_NumeroProcesso_id") REFERENCES "Processos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcAssuntos" ADD CONSTRAINT "ProcAssuntos_Pass_NumeroProcesso_id_fkey" FOREIGN KEY ("Pass_NumeroProcesso_id") REFERENCES "Processos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentosAnexados" ADD CONSTRAINT "DocumentosAnexados_Danex_Usuario_fkey" FOREIGN KEY ("Danex_Usuario") REFERENCES "Usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentosAnexados" ADD CONSTRAINT "DocumentosAnexados_Danex_NumeroProcesso_id_fkey" FOREIGN KEY ("Danex_NumeroProcesso_id") REFERENCES "Processos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transferencias" ADD CONSTRAINT "Transferencias_Tran_UsuarioOrigem_id_fkey" FOREIGN KEY ("Tran_UsuarioOrigem_id") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transferencias" ADD CONSTRAINT "Transferencias_Tran_ProcuradorDestino_id_fkey" FOREIGN KEY ("Tran_ProcuradorDestino_id") REFERENCES "Procuradores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcMovimentacoes" ADD CONSTRAINT "ProcMovimentacoes_Pmov_Procuradores_id_fkey" FOREIGN KEY ("Pmov_Procuradores_id") REFERENCES "Procuradores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcMovimentacoes" ADD CONSTRAINT "ProcMovimentacoes_Pmov_NumeroProcesso_id_fkey" FOREIGN KEY ("Pmov_NumeroProcesso_id") REFERENCES "Processos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
