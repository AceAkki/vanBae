import { Link, NavLink } from 'react-router-dom'

export default function Header () {
  function highlightActive(isActive) {
   return isActive ? "active-link" : null
  }

    return (
        <header>
           <Link to="/" className="site-logo">
            #vanBae
          </Link>
          <nav>
            <NavLink className={({isActive})=> highlightActive(isActive)} to="/about">About</NavLink>
            <NavLink className={({isActive})=> highlightActive(isActive)} to="/vans">Vans</NavLink>
            <NavLink className={({isActive})=> highlightActive(isActive)} to="/host">Host</NavLink>
          </nav>
        </header>
    )
}