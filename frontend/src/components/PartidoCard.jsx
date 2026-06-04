/**
 * PartidoCard.jsx - Match card component
 * Displays a single match with teams, score and status.
 * Handles three states: live, finished and upcoming.
 */

/**
 * PartidoCard component 
 * @param {Object} partido - Match data object
 * @param {string} partido.equipo_a - Home team name 
 * @param {string} partido.bandera_a - Home team flag emoji
 * @param {string} partido.equipo_b - Away team name
 * @param {string} partido.bandera_b - Away team flag emoji
 * @param {number} partido.goles_a - Home team goals
 * @param {number} partido.goles_b - Away team goals
 * @param {string} partido.estado -Match status: live, finished, upcoming
 * @param {string} partido.hora - Match time or date
 * @returns {JSX.Element} Match card
 */
function PartidoCard({ partido }) {
      // Determine badge text and style based on match status
    const getBadge = () => {
        if (partido.estado === "live")
            return <span className="badge badge-live">En vivo</span>
        if (partido.estado === "finished")
            return <span className="badge badge-finished">FINALIZADO</span>
        return <span className="badge badge-upcoming">PRÓXIMO</span>;
    };

    // Display score or dashes if match hasn't started
    const scoreDisplay =
        partido.goles_a !== null
         ? `${partido.goles_a} - ${partido.goles_b}`
         : "- : -";

    return (
        <div className={`match-card ${partido.estado}`}>
            {/* Home team */}
            <div className="team">
                <span className="team-flag">{partido.bandera_a}</span>
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
        <span className="team-flag">{partido.bandera_b}</span>
        <div>
          <div className="team-name">{partido.equipo_b}</div>
          <div className="team-group">{partido.grupo}</div>
        </div>
      </div>
    </div>
  );
}

export default PartidoCard;
        