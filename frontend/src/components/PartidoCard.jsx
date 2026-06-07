/**
 * PartidoCard.jsx - Match card component
 * Displays a single match with teams, score and status.
 * Handles three states: live, finished and upcoming.
 */

function PartidoCard({ partido }) {
  // Convert country codes to lowercase for flag-icons library
  const banderaA = partido.bandera_a ? partido.bandera_a.toLowerCase() : "";
  const banderaB = partido.bandera_b ? partido.bandera_b.toLowerCase() : "";

  // Display score or dashes if match hasn't started
  const scoreDisplay =
    partido.goles_a !== null
      ? `${partido.goles_a} - ${partido.goles_b}`
      : "- : -";

  // Determine badge text and style based on match status
  const getBadge = () => {
    if (partido.estado === "live")
      return <span className="badge badge-live">EN VIVO</span>;
    if (partido.estado === "finished")
      return <span className="badge badge-finished">FINALIZADO</span>;
    return <span className="badge badge-upcoming">PRÓXIMO</span>;
  };

  return (
    <div className={`match-card ${partido.estado}`}>
      {/* Home team */}
      <div className="team">
        <img 
          src={`https://flagcdn.com/w40/${partido.bandera_a.toLowerCase()}.png`}
          alt={partido.equipo_a}
          style={{width:"40px", height:"28px", borderRadius:"4px", objectFit:"cover"}}
        />
        <div>
          <div className="team-name">{partido.equipo_a}</div>
          <div className="team-group">{partido.grupo}</div>
        </div>
      </div>

      {/* Score and status */}
      <div className="score-box">
        <div className="score">{scoreDisplay}</div>
        <div className="match-meta">{partido.hora}</div>
        <div style={{ marginTop: "6px" }}>{getBadge()}</div>
      </div>

      {/* Away team */}
      <div className="team right">
        <img 
          src={`https://flagcdn.com/w40/${partido.bandera_b.toLowerCase()}.png`}
          alt={partido.equipo_b}
          style={{width:"40px", height:"28px", borderRadius:"4px", objectFit:"cover"}}
        />
        <div>
          <div className="team-name">{partido.equipo_b}</div>
          <div className="team-group">{partido.grupo}</div>
        </div>
      </div>
    </div>
  );
}

export default PartidoCard;