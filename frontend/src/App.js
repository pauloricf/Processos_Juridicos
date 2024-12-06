//import logo from './logo.svg';
import './App.css';
import CadastrarProcessos from "./pages/cadastrarProcessos";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/cadProcessos' element={<CadastrarProcessos/>}/>
      </Routes>
    </Router>
  )
}

export default App;
