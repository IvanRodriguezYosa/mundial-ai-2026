/**
 * EquipoSelector.jsx - Custom dropdown with real flag images
 * Replaces the native <select> to show flag images instead of emojis.
 */

import { useState, useEffect, useRef } from "react";

// Maps team names to their ISO 2-letter flag codes
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

function EquipoSelector({ value, onChange, placeholder }) {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef(null);

  // Cierra el dropdown si el usuario hace clic fuera
  useEffect(() => {
    const handleClickFuera = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickFuera);
    return () => document.removeEventListener("mousedown", handleClickFuera);
  }, []);

  const equipos = Object.keys(TEAM_FLAGS);
  const flagCode = value ? TEAM_FLAGS[value] : null;

  return (
    <div className="equipo-selector" ref={ref}>
      {/* Botón principal */}
      <div
        className={`selector-btn ${abierto ? "abierto" : ""}`}
        onClick={() => setAbierto(!abierto)}
      >
        {value ? (
          <>
            <img
              src={`https://flagcdn.com/w40/${flagCode}.png`}
              alt={value}
              className="selector-flag"
            />
            <span>{value}</span>
          </>
        ) : (
          <span className="selector-placeholder">{placeholder}</span>
        )}
        <span className="selector-arrow">{abierto ? "▲" : "▼"}</span>
      </div>

      {/* Lista desplegable */}
      {abierto && (
        <div className="selector-lista">
          {equipos.map((equipo) => (
            <div
              key={equipo}
              className={`selector-opcion ${value === equipo ? "seleccionado" : ""}`}
              onClick={() => {
                onChange(equipo);
                setAbierto(false);
              }}
            >
              <img
                src={`https://flagcdn.com/w40/${TEAM_FLAGS[equipo]}.png`}
                alt={equipo}
                className="selector-flag"
              />
              <span>{equipo}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EquipoSelector;