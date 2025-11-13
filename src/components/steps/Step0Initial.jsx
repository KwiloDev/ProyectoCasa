import React from "react";
import "./Step1Welcome.css";

export default function Step0Initial({ next }) {
  return (
    <div className="welcome-container">
      {/* Logo superior derecho */}
      <div className="welcome-header">
        <img
          src="/src/assets/logos/Logo Moneda - Tu Casa.png"
          alt="logo tu casa tu futuro"
        />
      </div>

      {/* Contenido principal */}
       <div className="welcome-content0">
        <div className="welcome-image0">
          <img
            onClick={next}
            src="/src/assets/Logos/Logo Tu casa Tu Futuro.png"
            alt="Logo Tu casa Tu Futuro"
          />
        </div>

        <div className="welcome-image1">
          <img
            onClick={next}
            src="/src/assets/Logos/Logo C&W Horizontal.png"
            alt="Logo C&W Horizontal"
          />
        </div>
      </div>
    </div>
    
  );
}
