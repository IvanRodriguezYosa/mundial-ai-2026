/**
 * Pronosticos.jsx - AI predictions page
 * Allows users to select two teams and get an AI-powered
 * match prediction using Claude API through the FastAPI backend.
 */

import { useState } from "react";

// List of available teams for prediction
const EQUIPOS = [
  { nombre: "Brasil", bandera: "🇧🇷" },
  { nombre: "Argentina", bandera: "🇦🇷" },
  { nombre: "Francia", bandera: "🇫🇷" },
  { nombre: "España", bandera: "🇪🇸" },
  { nombre: "Alemania", bandera: "🇩🇪" },
  { nombre: "Inglaterra", bandera: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { nombre: "Portugal", bandera: "🇵🇹" },
  { nombre: "Colombia", bandera: "🇨🇴" },
];

/**
 * Pronosticos page component
 * @returns {JSX.Element} Full AI predictions page
 */
function Pronosticos() {
  const [equipoA, setEquipoA] = useState("");
  const [equipoB, setEquipoB] = useState("");
  const [pronostico, setPronostico] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetches AI prediction from the backend
   * Validates that two different teams are selected before calling API
   */
  const obtenerPronostico = async () => {
    // Validate team selection
    if (!equipoA || !equipoB || equipoA === equipoB) {
      setError("Selecciona dos equipos diferentes");
      return;
    }

    setLoading(true);
    setError(null);
    setPronostico(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/pronostico/${equipoA}/${equipoB}`
      );
      if (!response.ok) throw new Error("Error al obtener pronóstico");
      const data = await response.json();
      setPronostico(data);
    } catch (err) {
      setError("Error al conectar con la IA. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Get flag emoji for a team name
  const getFlag = (nombre) =>
    EQUIPOS.find((e) => e.nombre === nombre)?.bandera || "🏳️";

  return (
    <div className="page">
      {/* AI Header */}
      <div className="ai-header">
        <div className="ai-icon">🤖</div>
        <div>
          <div className="ai-title">Motor de Pronósticos IA</div>
          <div className="ai-subtitle">
            Análisis profundo usando Claude AI — estadísticas, forma reciente y factores tácticos
          </div>
        </div>
      </div>

      <h2 className="section-title">🎯 Simular partido</h2>

      {/* Team selection */}
      <div className="prediction-select-row">
        <select
          className="pred-select"
          value={equipoA}
          onChange={(e) => setEquipoA(e.target.value)}
        >
          <option value="">Selecciona equipo local</option>
          {EQUIPOS.map((e) => (
            <option key={e.nombre} value={e.nombre}>
              {e.bandera} {e.nombre}
            </option>
          ))}
        </select>

        <select
          className="pred-select"
          value={equipoB}
          onChange={(e) => setEquipoB(e.target.value)}
        >
          <option value="">Selecciona equipo visitante</option>
          {EQUIPOS.map((e) => (
            <option key={e.nombre} value={e.nombre}>
              {e.bandera} {e.nombre}
            </option>
          ))}
        </select>

        <button className="predict-btn" onClick={obtenerPronostico}>
          🤖 Analizar con IA
        </button>
      </div>

      {/* Error message */}
      {error && <div className="error">{error}</div>}

      {/* Loading state */}
      {loading && (
        <div className="loading">
          <div className="loading-dots">
            <span></span><span></span><span></span>
          </div>
          <div>Analizando estadísticas con IA...</div>
        </div>
      )}

      {/* Prediction result */}
      {pronostico && (
        <div className="prediction-result">
          {/* Score */}
          <div className="pred-score-display">
            <div className="pred-team-block">
              <span className="pred-flag">{getFlag(equipoA)}</span>
              <div className="pred-team-name">{equipoA}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div className="pred-score-num">{pronostico.goles_a}</div>
              <div className="pred-vs">vs</div>
              <div className="pred-score-num">{pronostico.goles_b}</div>
            </div>
            <div className="pred-team-block">
              <span className="pred-flag">{getFlag(equipoB)}</span>
              <div className="pred-team-name">{equipoB}</div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="pred-stats-grid">
            <div className="pred-stat">
              <div className="pred-stat-label">⚽ Goleador probable</div>
              <div className="pred-stat-value">{pronostico.goleador}</div>
              <div className="pred-stat-sub">{pronostico.prob_goleador}% de chance</div>
            </div>
            <div className="pred-stat">
              <div className="pred-stat-label">🏁 Tiros de esquina</div>
              <div className="pred-stat-value">{pronostico.corners}</div>
              <div className="pred-stat-sub">total estimado</div>
            </div>
            <div className="pred-stat">
              <div className="pred-stat-label">🟨 Tarjetas amarillas</div>
              <div className="pred-stat-value">{pronostico.tarjetas}</div>
              <div className="pred-stat-sub">esperadas</div>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="ai-analysis">
            🤖 <strong>Análisis IA:</strong> {pronostico.analisis}
          </div>
        </div>
      )}
    </div>
  );
}

export default Pronosticos;