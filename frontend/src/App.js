import './App.css';
import ProcessPage from './pages/ProcessPage/ProcessPage';
import CadastrarProcessos from "./pages/cadastrarProcessos";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/cadProcessos' element={<CadastrarProcessos/>}/>
        <Route path='/process' element={<ProcessPage/>} />
      </Routes>
    </Router>
  )
}

export default App
