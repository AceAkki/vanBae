import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
export default function Van() {
  let [vanData, setVanData] = useState(null);
  const currentParam = useParams();
  const location = useLocation();
  console.log( currentParam, location)

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(`/api/vans/${currentParam.id}`);
      const res = await data.json();
      setVanData(res.vans);
      //console.log(res.vans)
    }
    fetchData();
  }, [currentParam.id]);

  return (
    <>
     {
      vanData !== null ?
        (
          <section>

          <Link to={location.state ? `..${location.state.search}` : ".."} relative="path" className="van-dtl-back">
            &larr; Back to all Vans
          </Link>
          <section className="van-info-section">
            <div>
              <img src={vanData.imageUrl} alt="" />
            </div>
            <div className="van-details-wrap">
                <p className={`type-label ${vanData.type}`}>{vanData.type}</p>
              <h1>
                {vanData.name}
              </h1>
              <h2>
                {`$${vanData.price}`}
              </h2>
              <p>
                {vanData.description}
              </p>
            </div>
          </section>
          </section>
        )
        : null
     }
    </>
  );
}
