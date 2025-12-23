import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";

import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Vans from "../pages/Vans.jsx";
import Van from "../pages/Van.jsx";
import Header from "../components/Header.jsx";

import "./server.js"

function App() {
  let [vansData, setVansData] = useState(null);

  useEffect(()=> {
    async function fetchData() {
      const data = await fetch("/api/vans");
      const res = await data.json();
      setVansData(res);
    }
    fetchData()
      
  }, [])

  return (
    <>
      <BrowserRouter>
        <header>
          <Link to="/" className="site-logo">
            #vanBae
          </Link>
          <nav>
            <Link to="/About">About</Link>
            <Link to="/Vans">Vans</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/About" element={<About />} />
          <Route path="/Vans" element={<Vans allData={vansData}/>} />
          <Route path="/Vans/:id" element={<Van />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
