/**
 * Partidos.jsx - Matches page
 * Fetches and displays all World Cup matches.
 * Groups matches by status: live, finished and upcoming.
 */

import { useState, useEffect } from "react";
import { getPartidos } from "../services/api";
import PartidoCard from "../components/PartidoCard";

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

    fetchPartidos(); // Run immediately on mount

    // Poll every 60 seconds for updated match data
    const intervalo = setInterval(fetchPartidos, 60000);

    // Cleanup: stop polling when component unmounts
    return () => clearInterval(intervalo);
  }, []);

  if (loading) return <div className="loading">⚽ Cargando partidos...</div>;
  if (error) return <div className="error">{error}</div>;

  // Filter matches by status
  const enVivo = partidos.filter((p) => p.estado === "IN_PLAY");
  const finalizados = partidos.filter((p) => p.estado === "FINISHED");
  const proximos = partidos.filter((p) => p.estado === "TIMED" || p.estado === "SCHEDULED");

  return (
    <div className="page">
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

      {proximos.length > 0 && (
        <section>
          <h2 className="section-title">🕐 Próximos Partidos</h2>
          <div className="matches-grid">
            {proximos.map((partido, index) => (
              <PartidoCard key={index} partido={partido} />
            ))}
          </div>
        </section>
      )}

      {finalizados.length > 0 && (
        <section>
          <h2 className="section-title">✅ Finalizados</h2>
          <div className="matches-grid">
            {finalizados.map((partido, index) => (
              <PartidoCard key={index} partido={partido} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Partidos;