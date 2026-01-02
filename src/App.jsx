import { useEffect, useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
} from "react-router-dom";

import "./App.css";
import "./Host.css";

import Layout from "../components/Layout.jsx";
import Error from "../components/Error.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Login, {loader as loginLoader, action as loginAction} from "../pages/Login.jsx";

import Vans, { loader as vansLoader } from "../pages/Vans/Vans.jsx";
import Van, { loader as vanLoader } from "../pages/Vans/Van.jsx";

import HostLayout from "../components/HostLayout.jsx";
import Dashboard from "../pages/Host/Dashboard.jsx";
import Income from "../pages/Host/Income.jsx";

import HostVans, { loader as hostVansLoader } from "../pages/Host/HostVans.jsx";
import HostVansDetail, {
  loader as hostVanLoader,
} from "../pages/Host/HostVansDetail.jsx";
import Details from "../pages/Host/HostVan/Details.jsx";
import Price from "../pages/Host/HostVan/Price";
import Photos from "../pages/Host/HostVan/Photos";
import Reviews from "../pages/Host/Reviews.jsx";

import NotFound from "../pages/404.jsx";

import "./server.js";
import { requireAuth } from "./utils.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} >
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />

      <Route path="vans" element={<Vans/>} errorElement={<Error />} loader={vansLoader}/>
      <Route path="vans/:id" element={<Van />} loader={vanLoader} />

      {/* no shared element so no needed to wrap it
             <Route path="vans">
             <Route index element={<Vans allData={vansData}/>} />
             <Route path=":id" element={<Van />} />
             </Route> */}

      <Route 
        path="host" 
        element={<HostLayout />}
        loader={async ({request}) => {
          let url = new URL(request.url).pathname;
          return await requireAuth(url)
        }}
      >
          
        <Route
          index
          element={<Dashboard />}
        />
        <Route
          path="income"
          element={<Income />}
        />
        <Route
          path="reviews"
          element={<Reviews />}
        />
        <Route path="vans" element={<HostVans />} loader={hostVansLoader} />
        <Route
          path="vans/:id"
          element={<HostVansDetail />}
          loader={hostVanLoader}
        >
          <Route
            index
            element={<Details />}
          />
          <Route
            path="price"
            element={<Price />}
          />
          <Route
            path="photos"
            element={<Photos />}
          />
        </Route>
      </Route>

      <Route 
        path="login" 
        element={<Login />} 
        loader={loginLoader}
        action={loginAction}
        // errorElement={<Login />}
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    // <>
    //   <BrowserRouter>
    //     {/* <header>
    //       <Link to="/" className="site-logo">
    //         #vanBae
    //       </Link>
    //       <nav>
    //         <Link to="/About">About</Link>
    //         <Link to="/Vans">Vans</Link>
    //       </nav>
    //     </header> */}
    //     <Routes>
    //       <Route path="/" element={<Layout />}>
    //         <Route index element={<Home />} />
    //         <Route path="about" element={<About />} />

    //         <Route path="vans" element={<Vans />} />
    //         <Route path="vans/:id" element={<Van />} />

    //         {/* no shared element so no needed to wrap it
    //          <Route path="vans">
    //          <Route index element={<Vans allData={vansData}/>} />
    //          <Route path=":id" element={<Van />} />
    //          </Route> */}

    //         <Route path="host" element={<HostLayout />}>
    //           <Route index element={<Dashboard />} />
    //           <Route path="income" element={<Income />} />
    //           <Route path="vans" element={<HostVans />} />
    //           <Route path="vans/:id" element={<HostVansDetail />}>
    //             <Route index element={<Details />} />
    //             <Route path="price" element={<Price />} />
    //             <Route path="photos" element={<Photos />} />
    //           </Route>

    //           <Route path="reviews" element={<Reviews />} />
    //         </Route>

    //         <Route path="*" element={<NotFound />} />
    //       </Route>
    //     </Routes>
    //   </BrowserRouter>
    // </>
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
