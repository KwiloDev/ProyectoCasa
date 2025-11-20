import React from 'react';
import './Step1Welcome.css';

export default function Step1Welcome({ next }) {
  return (
    <div className="welcome1-container">

      {/* IZQUIERDA */}
      <div className="welcome1-left">

        <h1 className="welcome1-title">
          Bienvenido a
        </h1>

        <h2 className="welcome1-subtitle">
          TU CASA, <span>TU FUTURO</span>
        </h2>

        {/* Burbuja de mensaje */}
        <div className="welcome1-bubble">
         Queremos conocer más de ti y acompañarte a cumplir el <strong>sueño de tener casa propia</strong> 
        </div>

        {/* Botón */}
        <button className="welcome1-button" onClick={next}>
          Empezar
        </button>
      </div>

      {/* DERECHA */}
      <div className="welcome1-right">
        <img
          src="/src/assets/Personajes/Personaje 1.png"
          alt="Personaje"
          className="welcome1-img"
        />
      </div>

      {/* LOGOS */}
     <div className="welcome-header0">
        <img
          src="/src/assets/logos/Logo Moneda - Tu Casa.png"
          alt="logo tu casa tu futuro"
        />
      </div>

    </div>
  );
}
