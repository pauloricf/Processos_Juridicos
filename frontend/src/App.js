import './App.css';
import ProcessPage from './pages/ProcessPage/ProcessPage';
import RegisterProcessPage from "./pages/RegisterProcessPage/RegisterProcessPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className='app-container'>
      <Routes>
        <Route path='/register-process' element={<RegisterProcessPage/>}/>
        <Route path='/process' element={<ProcessPage/>} />
      </Routes>
      </div>
    </Router>
  )
}

export default App
