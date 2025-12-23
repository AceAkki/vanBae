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
    }
    fetchData();
  }, [currentParam.id]);

  return (
    <>
      <h1>{useParams().id}</h1>
    </>
  );
}
