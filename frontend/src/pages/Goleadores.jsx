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

            {/* Country flag from flagcdn */}
            <img
              src={`https://flagcdn.com/w40/${TLA_TO_ISO[goleador.bandera] || goleador.bandera}.png`}              alt={goleador.equipo}
              style={{width:"32px", height:"22px", borderRadius:"4px", objectFit:"cover", flexShrink: 0}}
            />

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