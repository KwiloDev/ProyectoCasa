import React from 'react';
import './Step1Welcome.css';

export default function Step1Welcome({ next }) {
  return (
    <div className="welcome-container">
      <div className="welcome-left">
        <img
          src="/src/assets/logos/Logo Moneda - Tu Casa.png"
          alt="Logo Crepes & Waffles"
          className="welcome-logo"
        />

        <h2 className="welcome-title">
          ¡En Crepes & Waffles queremos ayudarte a cumplir tus metas!
        </h2>

        <p className="welcome-description">
          Empezar el proceso de compra de vivienda es un paso grande.
          <br />
          Nosotros te acompañamos con el corazón.
        </p>

        <div className="welcome-slogan">
          <p>TU CASA, TU FUTURO</p>
        </div>

        <div className="welcome-message">
          Queremos acompañarte en el camino para cumplir tu{' '}
          <strong>sueño de tener casa propia</strong>.
        </div>

        <button onClick={next} className="welcome-button">
          Empezar
        </button>
      </div>

      <div className="welcome-right">
        <img
          src="/src/assets/Personajes/Personaje 1.png"
          alt="Personaje ilustrado"
          className="welcome-illustration"
        />
      </div>
    </div>
  );
}
