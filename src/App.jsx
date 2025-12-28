import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import "./Host.css";

import Layout from "../components/Layout.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Vans from "../pages/Vans/Vans.jsx";
import Van from "../pages/Vans/Van.jsx";

import HostLayout from "../components/HostLayout.jsx";
import Dashboard from "../pages/Host/Dashboard.jsx";
import Income from "../pages/Host/Income.jsx";
import HostVans from "../pages/Host/HostVans.jsx";
import HostVansDetail from "../pages/Host/HostVansDetail.jsx";
import Details from "../pages/Host/HostVan/Details.jsx";
import Price from "../pages/Host/HostVan/Price";
import Photos from "../pages/Host/HostVan/Photos";
import Reviews from "../pages/Host/Reviews.jsx";

import NotFound from "../pages/404.jsx";

import "./server.js";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <header>
          <Link to="/" className="site-logo">
            #vanBae
          </Link>
          <nav>
            <Link to="/About">About</Link>
            <Link to="/Vans">Vans</Link>
          </nav>
        </header> */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />

            <Route path="vans" element={<Vans />} />
            <Route path="vans/:id" element={<Van />} />

            {/* no shared element so no needed to wrap it
             <Route path="vans">
             <Route index element={<Vans allData={vansData}/>} />
             <Route path=":id" element={<Van />} />
             </Route> */}

            <Route path="host" element={<HostLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="income" element={<Income />} />
              <Route path="vans" element={<HostVans />} />
              <Route path="vans/:id" element={<HostVansDetail />}>
                <Route index element={<Details />} />
                <Route path="price" element={<Price />} />
                <Route path="photos" element={<Photos />} />
              </Route>

              <Route path="reviews" element={<Reviews />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
