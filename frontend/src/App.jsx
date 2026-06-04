/**
 * App.jsx - Main application component
 * Configures the router and renders the main layout.
 * All pages are wrapped inside the Navbar component.
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Partidos from "./pages/Partidos";
import Grupos from "./pages/Grupos";
import Goleadores from "./pages/Goleadores";

/**
 * App component - Root of the application
 * @returns {JSX.Element} Full application with routing
 */
function App() {
  return (
    <BrowserRouter>
      {/* Navbar is always visible on every page */}
      <Navbar />

      {/* Routes define which page renders for each URL */}
      <Routes>
        <Route path="/" element={<Partidos />} />
        <Route path="/grupos" element={<Grupos />} />
        <Route path="/goleadores" element={<Goleadores />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;