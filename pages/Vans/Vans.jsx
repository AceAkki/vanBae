import { Link, useSearchParams } from "react-router-dom";

export default function Vans(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  console.log(typeFilter)

  let vansData = props.allData !== null ? props.allData.vans : null;
  let vanCards =
    vansData !== null
      ? vansData.map((van) => {
          return (
            <div className="van-card" key={van.id}>
              <Link to={`/vans/${van.id}`}>
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
        })
      : null;
  return (
    <main className="van-section">
      <h2 className="section-title">Explore our Van Options</h2>
    
      {vansData !== null ? (
        <section className="vans-wrap">{vanCards}</section>
      ) : null}
    </main>
  );
}
