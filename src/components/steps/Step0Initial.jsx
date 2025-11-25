import React, { useState, useEffect } from "react";
import "./Step0Initial.css";

// 👉 Importaciones correctas
import LogoMoneda from "../../assets/logos/Logo Moneda - Tu Casa.png";
import LogoTuCasa from "../../assets/Logos/Logo Tu casa Tu Futuro.png";
import LogoCyW from "../../assets/Logos/Logo C&W Horizontal.png";

export default function Step0Initial({ next }) {
  const [showLogos, setShowLogos] = useState(true);

  useEffect(() => {
    const logoTimer = setTimeout(() => setShowLogos(false), 3000);

    const nextTimer = setTimeout(() => {
      if (!showLogos) next();
    }, 3000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(nextTimer);
    };
  }, [showLogos, next]);

  return (
    <div className="welcome-container0">
      {/* Logo superior derecho */}
      <div className="welcome-header0">
        <img
          src={LogoMoneda}
          alt="logo tu casa tu futuro"
        />
      </div>

      {/* Transición: logos → texto */}
      <div
        className={`welcome-transition0 ${showLogos ? "show-logos0" : "show-text0"}`}
      >
        {showLogos ? (
          <div className="welcome-content0">
            <div className="welcome-image0">
              <img
                src={LogoTuCasa}
                alt="Logo Tu casa Tu Futuro"
              />
            </div>

            <div className="welcome-image1">
              <img
                src={LogoCyW}
                alt="Logo C&W Horizontal"
              />
            </div>
          </div>
        ) : (
          <div className="welcome-message0">
            ¡En <span>Crepes & Waffles</span> <br />
            queremos ayudarte a cumplir <br />
            tus metas y objetivos!
          </div>
        )}
      </div>
    </div>
  );
}
