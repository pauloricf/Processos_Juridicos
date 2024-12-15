import './App.css';
import ProcessPage from './pages/ProcessPage/ProcessPage';
import RegisterProcessPage from "./pages/RegisterProcessPage/RegisterProcessPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterUsersPage from './pages/UsersPages/RegisterUsersPage';

const App = () => {
  return (
    <Router>
      <div className='app-container'>
      <Routes>
        <Route path='/register-process' element={<RegisterProcessPage/>}/>
        <Route path='/process' element={<ProcessPage/>} />
        <Route path='/register-user' element={<RegisterUsersPage/>} />
      </Routes>
      </div>
    </Router>
  )
}

export default App
