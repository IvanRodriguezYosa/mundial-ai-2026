/**
 * Pronosticos.jsx - AI predictions page
 * Allows users to select two teams and get an AI-powered
 * match prediction using Claude API through the FastAPI backend.
 */

import { useState } from "react";
import EquipoSelector from "../components/EquipoSelector";

// Base URL for the backend API
const BASE_URL = import.meta.env.VITE_API_URL;

// Maps team names to ISO flag codes for the result display
const TEAM_FLAGS = {
  "Mexico": "mx", "Brazil": "br", "Argentina": "ar",
  "France": "fr", "Spain": "es", "Germany": "de",
  "England": "gb-eng", "Portugal": "pt", "Colombia": "co",
  "Netherlands": "nl", "Morocco": "ma", "United States": "us",
  "Switzerland": "ch", "Paraguay": "py", "Norway": "no",
  "Belgium": "be", "Australia": "au", "Algeria": "dz",
  "South Africa": "za", "Canada": "ca", "Egypt": "eg",
  "Ghana": "gh", "Croatia": "hr", "Cape Verde Islands": "cv",
};

function Pronosticos() {
  const [equipoA, setEquipoA] = useState("");
  const [equipoB, setEquipoB] = useState("");
  const [pronostico, setPronostico] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const obtenerPronostico = async () => {
    if (!equipoA || !equipoB || equipoA === equipoB) {
      setError("Selecciona dos equipos diferentes");
      return;
    }

    setLoading(true);
    setError(null);
    setPronostico(null);

    try {
      const response = await fetch(
        `${BASE_URL}/pronostico/${equipoA}/${equipoB}`
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

      {/* Team selection — custom dropdowns with real flag images */}
      <div className="prediction-select-row">
        <EquipoSelector
          value={equipoA}
          onChange={setEquipoA}
          placeholder="Selecciona equipo local"
        />
        <EquipoSelector
          value={equipoB}
          onChange={setEquipoB}
          placeholder="Selecciona equipo visitante"
        />
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
          {/* Score with real flag images */}
          <div className="pred-score-display">
            <div className="pred-team-block">
              <img
                src={`https://flagcdn.com/w40/${TEAM_FLAGS[equipoA]}.png`}
                alt={equipoA}
                className="pred-flag-img"
              />
              <div className="pred-team-name">{equipoA}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div className="pred-score-num">{pronostico.goles_a}</div>
              <div className="pred-vs">vs</div>
              <div className="pred-score-num">{pronostico.goles_b}</div>
            </div>
            <div className="pred-team-block">
              <img
                src={`https://flagcdn.com/w40/${TEAM_FLAGS[equipoB]}.png`}
                alt={equipoB}
                className="pred-flag-img"
              />
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