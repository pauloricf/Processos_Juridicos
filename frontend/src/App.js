import "./App.css";
import Sidebar from "./components/Sidebar";
import EditProcessPage from "./pages/EditProcessPage/EditProcessPage";
import ProcessPage from "./pages/ProcessPage/ProcessPage";
import RegisterProcessPage from "./pages/RegisterProcessPage/RegisterProcessPage";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import RegisterUsersPage from "./pages/UsersPages/RegisterUsersPage";
import UsersPage from "./pages/UsersPages/UsersPage";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import EditUsers from "./pages/OptionsUsersPage/EditUsers";
import LoginPage from "./pages/LoginPage/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import ExchangeProcesses from "./pages/ExchangeProcesses/ExchangeProcesses";

const Layout = () => (
  <>
    <Sidebar />
    <Outlet />
  </>
);

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/" element={<Layout />}>
            <Route path="/register-process" element={<PrivateRoute element={<RegisterProcessPage />} />} />
            <Route path="/process" element={<PrivateRoute element={<ProcessPage />} />} />
            <Route path="/register-user" element={<PrivateRoute element={<RegisterUsersPage />} />} />
            <Route path="/process/edit/:id" element={<PrivateRoute element={<EditProcessPage />} />} />
            <Route path="/user" element={<PrivateRoute element={<UsersPage />} />} />
            <Route path="/calendar-page" element={<PrivateRoute element={<CalendarPage />} />} />
            <Route path="/edit-user/:id" element={<PrivateRoute element={<EditUsers />} />} />
            <Route path="/processes/exchange" element={<PrivateRoute element={<ExchangeProcesses />} />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
