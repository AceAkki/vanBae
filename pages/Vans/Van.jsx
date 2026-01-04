import { useEffect, useState, Suspense } from "react";
import { Link, useParams, useLocation, useLoaderData, Await } from "react-router-dom";
import { fetchVanData } from "../../src/utils";

export function loader({ params }) {
  // async function fetchData() {
  //   const data = await fetch(`/api/vans/${params.id}`);
  //   const res = await data.json();
  //   // setVanData(res.vans);
  //   //console.log(res.vans)
  //   return res.vans;
  // }
  return {mainVanData : fetchVanData(params.id)};
}

export default function Van() {
  // let [vanData, setVanData] = useState(null);
  let {mainVanData} = useLoaderData();
  // const currentParam = useParams();
  const location = useLocation();
  // console.log( currentParam, location)

  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await fetch(`/api/vans/${currentParam.id}`);
  //     const res = await data.json();
  //     setVanData(res.vans);
  //     //console.log(res.vans)
  //   }
  //   fetchData();
  // }, [currentParam.id]);

  function linkState() {
    return location.state ? `..${location.state.search}` : "..";
  }

  const type = location.state?.type || "";
  return (
    <>
       <section>
          <Link to={linkState()} relative="path" className="van-dtl-back">
            &larr; Back to all
            {` ${type} Vans`}
          </Link>
          <Suspense fallback={<h1>Loading Details...</h1>}>
              <Await resolve={mainVanData}>
                {(vanData) => {
                  
                  return (
                    
                  <section className="van-info-section">
                  <div>
                    <img src={vanData.imageUrl} alt="" />
                  </div>
                  <div className="van-details-wrap">
                    <p className={`type-label ${vanData.type}`}>{vanData.type}</p>
                    <h1>{vanData.name}</h1>
                    <h2>{`$${vanData.price}`}</h2>
                    <p>{vanData.description}</p>
                  </div>
                </section>
                  )
                }
                }
              </Await>
          </Suspense>
        </section>
    </>
  );
}
