import { Box, capitalize, Card, CardActionArea, CardContent, Grid2, Stack, Typography } from "@mui/material";
import React from "react";
import CircleIcon from "@mui/icons-material/Circle";

const AttorneyCardList = ({ attorneys, handleOpenModalConfirmation }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid2 container spacing={2}>
        {attorneys.length > 0 ? (
          attorneys.map((attorney) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={attorney.id}>
              <Card sx={{ textAlign: "left", minHeight: 200 }}>
                <CardActionArea onClick={() => handleOpenModalConfirmation(attorney)}>
                  <CardContent>
                    <Typography variant="subtitle2" sx={{ marginBottom: "1rem", textAlign: "center" }}>
                      {capitalize(attorney.usuario.Usua_Nome)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Nº da OAB: {attorney.Pcrd_NumeroOAB}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Nº de processos: {attorney.Processos.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status atual dos processos:
                    </Typography>
                    <Stack direction="column" spacing={2}>
                      {/* Emitidos*/}
                      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} flexWrap="wrap">
                        <Stack direction="row" sx={{ flexWrap: "wrap" }}>
                          <CircleIcon fontSize="small" sx={{ color: "#2871A7" }} />
                          <Typography variant="body2" color="text.secondary">
                            Emitidos
                          </Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                          {attorney.emitidos}
                        </Typography>
                      </Stack>
                      {/* Concluídos*/}
                      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} flexWrap="wrap">
                        <Stack direction="row" sx={{ flexWrap: "wrap" }}>
                          <CircleIcon fontSize="small" sx={{ color: "#19D109" }} />
                          <Typography variant="body2" color="text.secondary">
                            Concluídos
                          </Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                          {attorney.concluidos}
                        </Typography>
                      </Stack>
                      {/* Vencidos*/}
                      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} flexWrap="wrap">
                        <Stack direction="row" sx={{ flexWrap: "wrap" }}>
                          <CircleIcon fontSize="small" sx={{ color: "#FF0000" }} />
                          <Typography variant="body2" color="text.secondary">
                            Vencidos
                          </Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                          {attorney.vencidos}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid2>
          ))
        ) : (
          <Typography>Nenhum procurador encontrado.</Typography>
        )}
      </Grid2>
    </Box>
  );
};

export default AttorneyCardList;
