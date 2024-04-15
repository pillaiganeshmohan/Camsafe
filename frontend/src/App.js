import "./style.css";
import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Home from "./components/Home";
import LoginSignup from "./components/LoginSignup";
import SignUp from "./components/SignUp";
import AdminSignup from "./components/AdminSignup";
import History from "./components/History/History";
import Detail from "./components/History/Details";
import AdminMain from "./components/Admin/AdminMain.js";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/header" element={<Header />} />
          <Route path="/history" element={<History />} />
          <Route path="/detailed-view" element={<Detail />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/adminsignup" element={<AdminSignup />} />
          <Route path="/adminmain" element={<AdminMain />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
