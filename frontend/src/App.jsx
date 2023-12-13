import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Sell from "./components/Sell";
// import Login from "./components/Login"; // Assuming you have a Login component
// import Register from "./components/Register"; // Assuming you have a Register component
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginShow = () => setShowLogin(true);
  const handleLoginClose = () => setShowLogin(false);

  return (
    <Router>
      <NavBar
        showLogin={showLogin}
        handleLoginShow={handleLoginShow}
        handleLoginClose={handleLoginClose}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sell" element={<Sell />} />
      </Routes>
    </Router>
  );
};

export default App;
