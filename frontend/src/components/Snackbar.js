// components/SnackbarComponent.jsx
import { Snackbar, Alert } from "@mui/material";

export function SnackbarComponent({ open, message, severity, onClose }) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose} >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}
