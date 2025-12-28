import { useEffect, useState } from "react";
import { Link, useSearchParams, useLoaderData } from "react-router-dom";

export function loader() {
  async function fetchData() {
    const res = await fetch("/api/vans");
    if(!res.ok) { throw { message:"Failed to fetch vans!", statusText: res.statusText, status:res.status}}
    const data = await res.json();
    return data;
  }
  return fetchData();

}
export default function Vans() {
  // let [vansData, setVansData] = useState();
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  const vansData = useLoaderData();

  // useEffect(() => {
  //   async function fetchData() {
  //     setLoading(true);
  //     try {
  //       const res = await fetch("/api/vans");
  //       if(!res.ok) { throw { message:"Failed to fetch vans!", statusText: res.statusText, status:res.status}}
  //       const data = await data.json();
  //       setVansData(res);
        
  //     } catch (error) {
  //       setError(error)
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, []);

  function VanCards() {
    return vansData.vans.map((van) => {
      return (
        <div
          className={
            typeFilter === null || typeFilter === ""
              ? "van-card"
              : van.type !== typeFilter
              ? "hide"
              : "van-card"
          }
          key={van.id}
        >
          <Link
            to={`${van.id}`}
            state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
          >
            <div className="van-img">
              <img src={van.imageUrl} alt="" />
            </div>

            <div className="main-dtl">
              <p>{van.name}</p>
              <p>{`$${van.price}`}</p>
            </div>
            <div className="add-dtl">
              <p className={`type-label ${van.type}`}>{van.type}</p>
              <p className="light-txt">/day</p>
            </div>
          </Link>
        </div>
      );
    });
  }

  function setFilter(key, value) {
    setSearchParams((oldParam) => {
      value === null ? oldParam.delete(key) : oldParam.set(key, value);
      return oldParam;
    });
  }

  return (
    <section className="van-section">
      <h2 className="section-title">Explore our Van Options</h2>
      <div className="vans-main-wrap">
        {/* {loading ? <h1>Loading...</h1> : null} */}
        {error ? <h2 style={{ color: "red" }}>{error.message}</h2> : null}
        {vansData !== null ? (
          <>
            <div className="filter-wrap">
              {Array.from(new Set(vansData.vans.map((van) => van.type))).map(
                (dt) => (
                  <button
                    key={dt}
                    className={typeFilter === dt ? dt : null}
                    onClick={() => setFilter("type", dt)}
                  >
                    {dt}
                  </button>
                  // <Link key={dt} to={`?type=${dt}`}>
                  //   {dt}
                  // </Link>
                )
              )}
              {typeFilter !== null ? (
                <button onClick={() => setFilter("type", null)}>X</button>
              ) : null}
              {/* <Link to=".">X</Link> */}
            </div>
            <section className="vans-wrap">{<VanCards />}</section>
          </>
        ) : null}
      </div>
    </section>
  );
}
