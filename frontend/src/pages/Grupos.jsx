/**
 * Grupos.jsx - Groups standings page
 * Fetches and displays the standings table for all World Cup groups.
 * Top 2 teams in each group are highlighted as qualified.
 */

import { useState, useEffect } from "react";
import { getGrupos } from "../services/api";

/**
 * Grupos page component
 * @returns {JSX.Element} Full groups standings page
 */
function Grupos() {
  // State to store groups data from the API
  const [grupos, setGrupos] = useState([]);
  // State to handle loading status
  const [loading, setLoading] = useState(true);
  // State to handle errors
  const [error, setError] = useState(null);

  // Fetches groups data from the backend when component mounts
  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const data = await getGrupos();
        setGrupos(data);
      } catch (err) {
        setError("Error al cargar los grupos");
      } finally {
        setLoading(false);
      }
    };
    fetchGrupos();
  }, []);

  if (loading) return <div className="loading">⚽ Cargando grupos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page">
      <h2 className="section-title">📊 Tabla de Posiciones</h2>
      <div className="group-grid">
        {grupos.map((grupo, index) => (
          <div key={index} className="group-card">
            {/* Group header */}
            <div className="group-header">{grupo.nombre}</div>

            {/* Standings table */}
            <table className="standings-table">
              <thead>
                <tr>
                  <th>Equipo</th>
                  <th>J</th>
                  <th>G</th>
                  <th>E</th>
                  <th>P</th>
                  <th>GF</th>
                  <th>GC</th>
                  <th>Pts</th>
                </tr>
              </thead>
              <tbody>
                {grupo.equipos.map((equipo, i) => (
                  <tr key={i} className={i < 2 ? "qualified" : ""}>
                    <td>
                      {/* Green bar indicates qualified teams (top 2) */}
                      <span className={`qualify-indicator ${i < 2 ? "q" : "e"}`}></span>
                      <img
                        src={`https://flagcdn.com/w40/${equipo.bandera}.png`}
                        alt={equipo.nombre}
                        style={{width:"24px", height:"16px", borderRadius:"2px", objectFit:"cover", marginRight:"8px", verticalAlign:"middle"}}
                      />
                      {equipo.nombre}
                    </td>
                    <td>{equipo.jugados}</td>
                    <td>{equipo.ganados}</td>
                    <td>{equipo.empatados}</td>
                    <td>{equipo.perdidos}</td>
                    <td>{equipo.goles_favor}</td>
                    <td>{equipo.goles_contra}</td>
                    <td className="points">{equipo.puntos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Grupos;