/**
 * PartidoCard.jsx - Match card component
 * Displays a single match with teams, score and status.
 * Handles three states: live, finished and upcoming.
 */

// Maps TLA codes from football-data.org to ISO 2-letter codes for flagcdn.com
const TLA_TO_ISO = {
  mex: "mx", rsa: "za", kor: "kr", cze: "cz", can: "ca", bih: "ba",
  usa: "us", par: "py", qat: "qa", sui: "ch", bra: "br", mar: "ma",
  hai: "ht", sco: "gb-sct", aus: "au", tur: "tr", ger: "de", cuw: "cw",
  ned: "nl", jpn: "jp", civ: "ci", ecu: "ec", swe: "se", tun: "tn",
  esp: "es", cpv: "cv", bel: "be", egy: "eg", ksa: "sa", ury: "uy",
  irn: "ir", nzl: "nz", fra: "fr", sen: "sn", irq: "iq", nor: "no",
  arg: "ar", alg: "dz", aut: "at", jor: "jo", por: "pt", cod: "cd",
  eng: "gb-eng", cro: "hr", gha: "gh", pan: "pa", uzb: "uz", col: "co",
  wal: "gb-wls", srb: "rs", cmr: "cm", chn: "cn", ven: "ve", per: "pe",
  uru: "uy", mli: "ml", tha: "th",
};

function PartidoCard({ partido }) {
  // Display score or dashes if match hasn't started
  const scoreDisplay =
    partido.goles_a !== null
      ? `${partido.goles_a} - ${partido.goles_b}`
      : "- : -";

  // Determine badge text and style based on match status
  const getBadge = () => {
    if (partido.estado === "IN_PLAY")
      return <span className="badge badge-live">EN VIVO</span>;
    if (partido.estado === "FINISHED")
      return <span className="badge badge-finished">FINALIZADO</span>;
    return <span className="badge badge-upcoming">PRÓXIMO</span>;
  };

  // Formats ISO date to readable format: "11 Jun · 19:00"
const formatearFecha = (fechaISO) => {
  const fecha = new Date(fechaISO);
  return fecha.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Bogota"
  });
};

  return (
    <div className={`match-card ${partido.estado}`}>
      {/* Home team */}
      <div className="team">
        <img
          src={`https://flagcdn.com/w40/${TLA_TO_ISO[partido.bandera_a] || partido.bandera_a}.png`}
          alt={partido.equipo_a}
          style={{ width: "40px", height: "28px", borderRadius: "4px", objectFit: "cover" }}
        />
        <div>
          <div className="team-name">{partido.equipo_a}</div>
          <div className="team-group">{partido.grupo}</div>
        </div>
      </div>

      {/* Score and status */}
      <div className="score-box">
        <div className="score">{scoreDisplay}</div>
        <div className="match-meta">{formatearFecha(partido.fecha)}</div>
        <div style={{ marginTop: "6px" }}>{getBadge()}</div>
      </div>

      {/* Away team */}
      <div className="team right">
        <img
          src={`https://flagcdn.com/w40/${TLA_TO_ISO[partido.bandera_b] || partido.bandera_b}.png`}
          alt={partido.equipo_b}
          style={{ width: "40px", height: "28px", borderRadius: "4px", objectFit: "cover" }}
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