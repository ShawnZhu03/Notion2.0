import logo from './logo.svg';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import LoginReg from '../logInReg/LoginReg';



function App() {
  return (
    <Router>
      <div>
        <LoginReg />
      </div>
    </Router>
  );
}

export default App;
