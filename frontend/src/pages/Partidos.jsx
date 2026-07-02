/**
 * Partidos.jsx - Matches page
 * Fetches and displays all World Cup matches.
 * Organized by stage: live, knockout rounds, and group stage.
 */

import { useState, useEffect } from "react";
import { getPartidos } from "../services/api";
import PartidoCard from "../components/PartidoCard";

// Maps API stage values to readable Spanish labels
const STAGE_LABELS = {
  GROUP_STAGE: "📋 Fase de Grupos",
  LAST_32: "⚔️ 16avos de Final",
  LAST_16: "🔥 Octavos de Final",
  QUARTER_FINALS: "🏆 Cuartos de Final",
  SEMI_FINALS: "🌟 Semifinales",
  THIRD_PLACE: "🥉 Tercer Puesto",
  FINAL: "🏆 Final",
};

function Partidos() {
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const data = await getPartidos();
        setPartidos(data);
      } catch (err) {
        setError("Error al cargar los partidos");
      } finally {
        setLoading(false);
      }
    };

    fetchPartidos();

    // Poll every 60 seconds for updated match data
    const intervalo = setInterval(fetchPartidos, 60000);

    // Cleanup: stop polling when component unmounts
    return () => clearInterval(intervalo);
  }, []);

  if (loading) return <div className="loading">⚽ Cargando partidos...</div>;
  if (error) return <div className="error">{error}</div>;

  // Separate live matches from the rest
  const enVivo = partidos.filter((p) => p.estado === "IN_PLAY");

// Group remaining matches by stage
const porFase = partidos
  .filter((p) => p.estado !== "IN_PLAY")
  .reduce((acc, partido) => {
    const fase = partido.stage || "GROUP_STAGE";
    if (!acc[fase]) acc[fase] = [];
    acc[fase].push(partido);
    return acc;
  }, {});

// Within each stage, sort: upcoming first, then finished
Object.keys(porFase).forEach((fase) => {
  porFase[fase].sort((a, b) => {
    if (a.estado === "TIMED" && b.estado !== "TIMED") return -1;
    if (a.estado !== "TIMED" && b.estado === "TIMED") return 1;
    return new Date(a.fecha) - new Date(b.fecha);
  });
});

  // Order in which stages should appear
// Order stages by most current first - stages with upcoming/live matches appear first
// Order stages by the nearest upcoming match date
const ordenFases = [
  "FINAL",
  "THIRD_PLACE", 
  "SEMI_FINALS",
  "QUARTER_FINALS",
  "LAST_16",
  "LAST_32",
  "GROUP_STAGE",
].sort((a, b) => {
  const proximoA = porFase[a]?.find(p => p.estado === "TIMED");
  const proximoB = porFase[b]?.find(p => p.estado === "TIMED");
  if (!proximoA && !proximoB) return 0;
  if (!proximoA) return 1;
  if (!proximoB) return -1;
  return new Date(proximoA.fecha) - new Date(proximoB.fecha);
});

  return (
    <div className="page">
      {/* Live matches always on top */}
      {enVivo.length > 0 && (
        <section>
          <h2 className="section-title">🔴 En Vivo</h2>
          <div className="matches-grid">
            {enVivo.map((partido, index) => (
              <PartidoCard key={index} partido={partido} />
            ))}
          </div>
        </section>
      )}

      {/* Matches grouped by stage */}
      {ordenFases.map((fase) =>
        porFase[fase] ? (
          <section key={fase}>
            <h2 className="section-title">{STAGE_LABELS[fase] || fase}</h2>
            <div className="matches-grid">
              {porFase[fase].map((partido, index) => (
                <PartidoCard key={index} partido={partido} />
              ))}
            </div>
          </section>
        ) : null
      )}
    </div>
  );
}

export default Partidos;