import './App.css';
import Debit from './Components/Debit_component';
import Credit from './Components/Credit_component';
import Home from './Components/Home_page';
import { ReactDOM } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Daily_Savings from './Components/Daily_savings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Debit" element={<Debit/>}></Route>
        <Route path="/Credit" element={<Credit/>}></Route> 
        <Route path='/Daily-savings' element={<Daily_Savings/>}></Route>       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
