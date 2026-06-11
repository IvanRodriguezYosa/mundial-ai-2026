/**
 * Partidos.jsx - Matches page
 * Fetches and displays all World Cup matches.
 * Groups matches by status: live, finished and upcoming.
 */

const enVivo = partidos.filter((p) => p.estado === "IN_PLAY");
const finalizados = partidos.filter((p) => p.estado === "FINISHED");
const proximos = partidos.filter((p) => p.estado === "TIMED" || p.estado === "SCHEDULED");

/**
 * Partidos page component
 * @returns {JSX.Element} Full matches page
 */
function Partidos() {
  // State to store matches data from the API
  const [partidos, setPartidos] = useState([]);
  // State to handle loading status
  const [loading, setLoading] = useState(true);
  // State to handle errors
  const [error, setError] = useState(null);

  // useEffect runs when the component mounts
  // Fetches matches from the backend API
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
  }, []); // Empty array means: run only once when component mounts

  if (loading) return <div className="loading">⚽ Cargando partidos...</div>;
  if (error) return <div className="error">{error}</div>;

  // Filter matches by status
  const enVivo = partidos.filter((p) => p.estado === "live");
  const finalizados = partidos.filter((p) => p.estado === "finished");
  const proximos = partidos.filter((p) => p.estado === "upcoming");

  return (
    <div className="page">
      {/* Live matches section */}
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

      {/* Upcoming matches section */}
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

      {/* Finished matches section */}
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