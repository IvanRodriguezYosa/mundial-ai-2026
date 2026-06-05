import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        ⚽ MUNDIAL AI <span className="navbar-badge">2026</span>
      </div>
      <div className="navbar-links">
        <Link to="/" className={isActive("/") ? "active" : ""}>🏟️ Partidos</Link>
        <Link to="/grupos" className={isActive("/grupos") ? "active" : ""}>📊 Grupos</Link>
        <Link to="/goleadores" className={isActive("/goleadores") ? "active" : ""}>⚽ Goleadores</Link>
        <Link to="/pronosticos" className={isActive("/pronosticos") ? "active" : ""}>🤖 Pronósticos IA</Link>
      </div>
    </nav>
  );
}

export default Navbar;