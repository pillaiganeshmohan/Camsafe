import './style.css';
import React from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
function App() {
  
  return (
    <Router>
    <div className="App">
      
        <Routes>
        <Route path="/header" element={<Header/>} />
        <Route path="/about"  element={<AboutUs/>} />
        <Route path="/contact" element={<ContactUs/>} />
        </Routes> 
    </div>
    </Router>
    
  );
}

export default App;
