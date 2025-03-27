// pages/ReportsPage.tsx
import React, { useState, useRef } from "react";
import { Button, Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";
import { Download, PictureAsPdf } from "@mui/icons-material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { usePDF } from "react-to-pdf";
import { getReports } from "../../services/reportService";
import styles from "./ReportsPage.module.css";

const ReportsPage = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toPDF, targetRef } = usePDF({ filename: "relatorio_procuradores.pdf" });

  const loadReport = async () => {
    setLoading(true);
    try {
      const data = await getReports();
      setReportData(data);
    } catch (error) {
      console.error("Error loading report:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    const processedData = reportData.map((prosecutor) => {
      const processos = prosecutor.Processos;

      return {
        Nome: prosecutor.usuario.Usua_Nome,
        Matrícula: prosecutor.usuario.Usua_Matricula,
        OAB: prosecutor.Pcrd_NumeroOAB,
        "Total Processos": processos.length,
        Emitidos: processos.filter((p) => p.Pcss_Status === "Emitido").length,
        Concluídos: processos.filter((p) => p.Pcss_Status === "Concluído").length,
        Vencidos: processos.filter((p) => p.Pcss_Status === "Vencido").length,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(processedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório Procuradores");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "relatorio_procuradores.xlsx");
  };

  const exportToPDF = () => {
    toPDF();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Relatório de Procuradores</h1>

      <div className={styles.buttonsContainer}>
        <Button variant="contained" onClick={loadReport} disabled={loading} className={styles.button}>
          {loading ? "Carregando..." : "Carregar Relatório"}
        </Button>

        <Button
          variant="contained"
          color="success"
          startIcon={<Download />}
          onClick={exportToExcel}
          disabled={reportData.length === 0 || loading}
          className={styles.button}>
          Exportar para Excel
        </Button>

        <Button
          variant="contained"
          color="error"
          startIcon={<PictureAsPdf />}
          onClick={exportToPDF}
          disabled={reportData.length === 0 || loading}
          className={styles.button}>
          Exportar para PDF
        </Button>
      </div>

      {reportData.length > 0 && (
        <div ref={targetRef}>
          <h2 className={styles.reportTitle}>Relatório de Procuradores</h2>
          <Paper className={styles.tableContainer}>
            <Table className={styles.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={styles.tableCell}>
                    <strong>Procurador</strong>
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    <strong>Matrícula</strong>
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    <strong>OAB</strong>
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    <strong>Total</strong>
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    <strong>Emitidos</strong>
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    <strong>Concluídos</strong>
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    <strong>Vencidos</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportData.map((prosecutor) => {
                  const processos = prosecutor.Processos;
                  const emitidos = processos.filter((p) => p.Pcss_Status === "Emitido").length;
                  const concluidos = processos.filter((p) => p.Pcss_Status === "Concluído").length;
                  const vencidos = processos.filter((p) => p.Pcss_Status === "Vencido").length;

                  return (
                    <TableRow key={prosecutor.id}>
                      <TableCell className={styles.tableCell}>{prosecutor.usuario.Usua_Nome}</TableCell>
                      <TableCell className={styles.tableCell}>{prosecutor.usuario.Usua_Matricula}</TableCell>
                      <TableCell className={styles.tableCell}>{prosecutor.Pcrd_NumeroOAB}</TableCell>
                      <TableCell className={styles.tableCell}>{processos.length}</TableCell>
                      <TableCell className={styles.tableCell}>{emitidos}</TableCell>
                      <TableCell className={styles.tableCell}>{concluidos}</TableCell>
                      <TableCell className={styles.tableCell}>{vencidos}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
          <div className={styles.footer}>Gerado em: {new Date().toLocaleDateString()}</div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
