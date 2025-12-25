import { useOutletContext } from "react-router-dom";

export default function Details() {
  const data = useOutletContext();
  return (
    <div className="host-van-dtls">
      <p>
        <strong>Name :</strong>

        <span>{data.name}</span>
      </p>
      <p>
        <strong>Category :</strong>

        <span style={{textTransform:"capitalize"}}>{data.type}</span>
      </p>
      <p>
        <strong>Description :</strong>
        <span>{data.description}</span>
      </p>
      <p>
        <strong>Visibility :</strong>
        <span>Public</span>
      </p>
    </div>
  );
}
