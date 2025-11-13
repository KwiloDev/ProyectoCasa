import React from 'react';
import './Step3Hello.css';

export default function Step3Hello({ data, next }) {
  const nameToDisplay = data.name ? data.name.toUpperCase() : 'SANTIAGO';

  return (
    <div className="step3-container">
      <div className="step3-content">
        <h1 className="step3-title">¡HOLA, {nameToDisplay}!</h1>

        <p className="step3-message">
          Desde el equipo de <strong>Bienestar</strong>, queremos hacerte unas preguntas que nos ayudarán a 
          <strong> guiarte de forma personalizada </strong> en el proceso de 
          <strong> compra de vivienda.</strong>
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
