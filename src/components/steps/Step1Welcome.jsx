import React from 'react';
import './Step1Welcome.css';

export default function Step1Welcome({ next }) {
  return (
    <div className="welcome-container">
      {/* Logo superior derecho */}
      <div className="welcome-header">
        <img src="/src/assets/logos/Logo Moneda - Tu Casa.png" alt="logo tu casa tu futuro" />

      </div>

      {/* Contenido principal */}
      <div className="welcome-content">
        <div className="welcome-text">
          <h1>
            <strong>Bienvenido a</strong><br />
            <span>TU CASA, TU FUTURO</span>
          </h1>

          <div className="welcome-message">
            <p>
              Queremos acompañarte en el camino para cumplir tu{' '}
              <strong>sueño de tener casa propia.</strong>
            </p>
          </div>

          <button onClick={next} className="welcome-button">
            Empezar
          </button>
        </div>

        <div className="welcome-image">
          <img src="/src/assets/Personajes/Personaje 1.png" alt="asesora" />
        </div>
      </div>
    </div>
  );
}
