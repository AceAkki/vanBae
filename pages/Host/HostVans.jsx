import { Link, redirect, useLoaderData, Await } from "react-router-dom";
import { useState, useEffect, Suspense } from "react";

import { fetchHostData } from "../../src/utils";

export function loader() {
//   async function fetchHostData() {
//     const data = await fetch("/api/host/vans", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         id: JSON.parse(localStorage.getItem("user")).userid,
//       }),
//     });
//     const res = await data.json();
//     // setHostVans(res.vans);
//     return res.vans;
//   }
  return { hostVansData: fetchHostData() };
}

export default function Vans() {
  // let [hostVans, setHostVans] = useState(null)
  let { hostVansData } = useLoaderData();

  function RenderVans(props) {
    return props.data.map((van) => (
      <Link to={`${van.id}`} key={van.id}>
        <div className="van-card">
          <div>
            <img src={van.imageUrl} alt="" />
          </div>
          <div className="van-dtl">
            <h5>{van.name}</h5>
            <p>{`$${van.price}/day`}</p>
          </div>
        </div>
      </Link>
    ));
  }

  // useEffect(()=> {
  //     fetchHostData()
  // }, [])

  // console.log(hostVans)
  return (
    <section className="host-van-section">
      <h1 className="section-title">Your Listed Vans</h1>

      <Suspense
        fallback={
          <section>
            <h1>Loading All Vans...</h1>
          </section>
        }
      >
        <Await resolve={hostVansData}>
          {(hostVans) => (
            <div className="host-vans-wrap">
              {/* { 
                                // no needed to add error boundary since loader now handles it by fetching data before
                                hostVans !== null ? <RenderVans /> : null
                            } */}
              <RenderVans data={hostVans} />
            </div>
          )}
        </Await>
      </Suspense>
    </section>
  );
}
