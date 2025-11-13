import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <header className="navbar">
      <nav className="navbar__content">
        <div className="navbar__logo">StarWars</div>

        <div className="navbar__links">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
          <NavLink to="/items" className="nav-link">Items</NavLink>
          <NavLink to="/login" className="nav-link">Login</NavLink>
        </div>
      </nav>
    </header>
  );
}
