import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './Dropdowns.css';

function Categoria() {
  return (
    <DropdownButton id="dropdown-basic-button" title="Categoria">
      <Dropdown.Item href="#/action-1">Ação ordinária (30 dias úteis)</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Juizado especial (15 dias úteis)</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Mandado de segurança (10 dias úteis)</Dropdown.Item>
    </DropdownButton>
  );
}

export default Categoria;