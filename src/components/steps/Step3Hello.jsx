import React from 'react';
import './Step3Hello.css';

export default function Step3Hello({ data, next }) {
  const nameToDisplay = data.name ? data.name.toUpperCase() : 'SANTIAGO';

  return (
    <div className="step3-container">
      <div className="step3-content">
        <h1 className="step3-title">¡HOLA, {nameToDisplay}!</h1>

        <p className="step3-message">
          Tu sueño de tener vivienda está más cerca de ser una realidad.

Te invitamos a compartir tu información para que seas de los primeros en abrir la puerta a esta nueva oportunidad.

<strong> Prepárate… vienen sorpresas que podrán convertirse en la semilla de tu próximo hogar.</strong>
        </p>

        <div className="step3-button-wrapper">
          <button onClick={next} className="step3-button">
            Empecemos
          </button>
        </div>
      </div>
    </div>
  );
}
