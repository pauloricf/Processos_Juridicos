import './App.css';
import Sidebar from './components/Sidebar';
import SidebarGerenciar from './components/SidebarGerenciar'
import EditProcessPage from './pages/EditProcessPage/EditProcessPage';
import ProcessPage from './pages/ProcessPage/ProcessPage';
import RegisterProcessPage from "./pages/RegisterProcessPage/RegisterProcessPage";
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import RegisterUsersPage from './pages/UsersPages/RegisterUsersPage';
import UsersPage from './pages/UsersPages/UsersPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import EditUsers from './pages/OptionsUsersPage/EditUsers';
import DistributionPage from './pages/DistributionProcessPage/DistributionPage'
import DeleteUserModal from './components/DeleteModal';


const Layout = () => {
  const location = useLocation();

  // Condicional para exibir diferentes Sidebars
  const isUserPage = location.pathname.startsWith('/user');

  return (
    <>
      {isUserPage ? <SidebarGerenciar /> : <Sidebar />}
      <Outlet />
    </>
  );
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/register-process' element={<RegisterProcessPage/>}/>
          <Route path='/process' element={<ProcessPage/>}/>
          <Route path='/user/register-user' element={<RegisterUsersPage/>} />
          <Route path='/process/edit/:id' element={<EditProcessPage/>}/>
          <Route path='/user' element={<UsersPage/>}/>
          <Route path='/calendar-page' element={<CalendarPage />} />
          <Route path='/user/edit-user/:id' element={<EditUsers />} />
          <Route path='/user/distribution' element={<DistributionPage />} />
          <Route path='/modal' element={<DeleteUserModal />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
