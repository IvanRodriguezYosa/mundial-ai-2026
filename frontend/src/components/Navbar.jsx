/**
 * Navbar.jsx - Main navigation component
 * Renders the top navigation bar with links to all app sections.
 * Highlights the currently active route.
 */

import { Link, useLocation } from "react-router-dom";

/**
 * Navbar component
 * @returns {JSX.Element} Top navigation bar
 */
function Navbar() {
    // useLocation tells us which route is currently active
    const location = useLocation();
  // Helper function to check if a route is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navar">
              <div className="navbar-logo">
        ⚽ MUNDIAL AI <span className="navbar-badge">2026</span>
      </div>
      <div className="navbar-links">
        <Link to="/" className={isActive("/") ? "active" : ""}>
          🏟️ Partidos
        </Link>
        <Link to="/grupos" className={isActive("/grupos") ? "active" : ""}>
          📊 Grupos
        </Link>
        <Link to="/goleadores" className={isActive("/goleadores") ? "active" : ""}>
          ⚽ Goleadores
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
