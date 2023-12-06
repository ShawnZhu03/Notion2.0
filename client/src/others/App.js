import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginReg from '../logInReg/LoginReg'; 
import MainPage from '../MainPage';
import '../styles/globalStyles.css';

function App() {
  return (
    
    <Router>
      <Routes>
        <Route index element = {<LoginReg/>} />
        <Route path = "/MainPage" element = {<MainPage/>}>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
