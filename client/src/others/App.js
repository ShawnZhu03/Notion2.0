import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from '../pages/login';


function App() {
  return (
    
    <Router>
      <Routes>
        <Route index element = {<Login/>} />
          
        <Route path = "/MainPage">

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
