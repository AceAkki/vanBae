import { NavLink, Outlet } from "react-router-dom";
export default function HostLayout() {
  function highlightActive(isActive) {
   return isActive ? "active-tab" : null
  }
  return (
    <section className="host-sec">
      <div className="host-nav">
        <NavLink className={({isActive})=> highlightActive(isActive)} end to=".">Dashboard</NavLink>
        <NavLink className={({isActive})=> highlightActive(isActive)} to="income">Income</NavLink>
        <NavLink className={({isActive})=> highlightActive(isActive)} to="vans">Vans</NavLink>
        <NavLink className={({isActive})=> highlightActive(isActive)} to="reviews">Reviews</NavLink>
      </div>

      <Outlet />
    </section>
  );
}
