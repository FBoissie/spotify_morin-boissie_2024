import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importez BrowserRouter
import Home from "./pages/Home";
import Recommendation from "./pages/Recommendation";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      {" "}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommandation" element={<Recommendation />} />
        <Route path="/profil" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
