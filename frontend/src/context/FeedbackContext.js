// contexts/FeedbackContext.jsx
import { createContext, useState, useContext } from "react";
import { SnackbarComponent } from "../components/Snackbar";

const FeedbackContext = createContext();

export function FeedbackProvider({ children }) {
  const [feedback, setFeedback] = useState({
    open: false,
    message: "",
    severity: "info", // 'error' | 'warning' | 'info' | 'success'
  });

  const showFeedback = (message, severity = "info") => {
    setFeedback({ open: true, message, severity });
  };

  const hideFeedback = () => {
    setFeedback((prev) => ({ ...prev, open: false }));
  };

  return (
    <FeedbackContext.Provider value={{ showFeedback, hideFeedback }}>
      {children}
      <SnackbarComponent open={feedback.open} message={feedback.message} severity={feedback.severity} onClose={hideFeedback} />
    </FeedbackContext.Provider>
  );
}

export const useFeedback = () => useContext(FeedbackContext);
