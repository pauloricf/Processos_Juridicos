import './App.css';
import Sidebar from './components/Sidebar';
import EditProcessPage from './pages/EditProcessPage/EditProcessPage';
import ProcessPage from './pages/ProcessPage/ProcessPage';
import RegisterProcessPage from "./pages/RegisterProcessPage/RegisterProcessPage";
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import RegisterUsersPage from './pages/UsersPages/RegisterUsersPage';
import ListUsersPage from './pages/UsersPages/ListUsersPage';
import UsersPage from './pages/UsersPages/UsersPage';


const Layout = () => (
  <>
    <Sidebar/>
    <Outlet/>
  </>
)

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/register-process' element={<RegisterProcessPage/>}/>
          <Route path='/process' element={<ProcessPage/>}/>
          <Route path='/register-user' element={<RegisterUsersPage/>} />
          <Route path='/process/edit/:id' element={<EditProcessPage/>}/>
          <Route path='/user' element={<UsersPage/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
