import './App.css';
import Debit from './Components/Debit_component';
import Credit from './Components/Credit_component';
import Home from './Components/Home_page';
import { ReactDOM } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Debit" element={<Debit/>}></Route>
        <Route path="/Credit" element={<Credit/>}></Route>        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
