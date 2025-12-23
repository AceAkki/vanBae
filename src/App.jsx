import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";

import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Header from "../components/Header.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <header>
            <div className="site-logo">
              <Link to="/">#vanBae</Link>
            </div>
          <nav>

            <div className="links-sub-wrap">
              <div className="link-button">
                <Link to="/About">About</Link>
              </div>

              <div className="link-button">
                <Link to="/Vans">Vans</Link>
              </div>
            </div>

          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/About" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
