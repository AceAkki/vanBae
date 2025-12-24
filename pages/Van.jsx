import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function Van() {
  let [vanData, setVanData] = useState(null);
  const currentParam = useParams();

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(`/api/vans/${currentParam.id}`);
      const res = await data.json();
      setVanData(res.vans);
      console.log(res.vans)
    }
    fetchData();
  }, [currentParam.id]);

  return (
    <>
     {
      vanData !== null ?
        (
          <main className="van-info-section">
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
          </main>
        )
        : null
     }
    </>
  );
}
