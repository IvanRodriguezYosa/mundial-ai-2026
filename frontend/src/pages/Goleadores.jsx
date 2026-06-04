/**
 * Goleadores.jsx - Top scorers page
 * Fetches and displays the tournament top scorers ranking.
 * Shows a visual progress bar based on goals scored.
 */

import { useState, useEffect } from "react";
import { getGoleadores } from "../services/api";

/**
 * Goleadores page component
 * @returns {JSX.Element} Full top scorers page
 */
function Goleadores() {
  // State to store scorers data from the API
  const [goleadores, setGoleadores] = useState([]);
  // State to handle loading status
  const [loading, setLoading] = useState(true);
  // State to handle errors
  const [error, setError] = useState(null);

  // Fetches top scorers from the backend when component mounts
  useEffect(() => {
    const fetchGoleadores = async () => {
      try {
        const data = await getGoleadores();
        setGoleadores(data);
      } catch (err) {
        setError("Error al cargar los goleadores");
      } finally {
        setLoading(false);
      }
    };

    fetchGoleadores();
  }, []);

  if (loading) return <div className="loading">⚽ Cargando goleadores...</div>;
  if (error) return <div className="error">{error}</div>;

  // Max goals is used to calculate progress bar width
  const maxGoles = goleadores[0]?.goles || 1;

  return (
    <div className="page">
      <h2 className="section-title">⚽ Tabla de Goleadores</h2>
      <div className="scorers-list">
        {goleadores.map((goleador, index) => (
          <div key={index} className="scorer-row">
            {/* Rank number - gold for first place */}
            <div className={`scorer-rank ${index === 0 ? "top" : ""}`}>
              {index + 1}
            </div>

            {/* Flag */}
            <div className="scorer-flag">{goleador.bandera}</div>

            {/* Player info */}
            <div className="scorer-info">
              <div className="scorer-name">{goleador.nombre}</div>
              <div className="scorer-team">{goleador.equipo}</div>
            </div>

            {/* Progress bar based on goals relative to leader */}
            <div className="scorer-bar">
              <div
                className="scorer-bar-fill"
                style={{ width: `${(goleador.goles / maxGoles) * 100}%` }}
              ></div>
            </div>

            {/* Goals count */}
            <div className="scorer-goals">{goleador.goles}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Goleadores;