import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <header className="navbar">
      <nav className="navbar__content">
        <div className="navbar__logo">StarWars</div>

        <div className="navbar__links">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
          <NavLink to="/items" className="nav-link">Items</NavLink>

          {!user && (
            <>
              <NavLink to="/login" className="nav-link">Login</NavLink>
              <NavLink to="/signup" className="nav-link">Signup</NavLink>
            </>
          )}

          {user && (
            <>
              <NavLink to="/profile" className="nav-link">Profile</NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className="nav-link"
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
