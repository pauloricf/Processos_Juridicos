/*
  Warnings:

  - You are about to alter the column `Danex_Nome` on the `DocumentosAnexados` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `VarChar(100)`.
  - You are about to drop the column `Pnjd_NumeroProcesso` on the `ProcNaoJudiciais` table. All the data in the column will be lost.
  - You are about to alter the column `Pcss_ValorAcao` on the `Processos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `Pcss_Status` on the `Processos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(20)`.
  - Added the required column `Pnjd_Prazo` to the `ProcNaoJudiciais` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Pcss_Requerente` to the `Processos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Pcss_Siged` to the `Processos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DocumentosAnexados" ALTER COLUMN "Danex_Nome" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "ProcNaoJudiciais" DROP COLUMN "Pnjd_NumeroProcesso",
ADD COLUMN     "Pnjd_Prazo" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Processos" ADD COLUMN     "Pcss_Destino" CHAR(15),
ADD COLUMN     "Pcss_Requerente" VARCHAR(100) NOT NULL,
ADD COLUMN     "Pcss_Requerido" VARCHAR(100),
ADD COLUMN     "Pcss_Siged" CHAR(22) NOT NULL,
ALTER COLUMN "Pcss_ValorAcao" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "Pcss_Status" SET DATA TYPE VARCHAR(20);
