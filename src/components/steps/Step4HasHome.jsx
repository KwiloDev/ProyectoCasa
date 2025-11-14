import React from 'react';
import WomanIllustration from '../../assets/Personajes/Personaje 3.png';
import './Step4HasHome.css';

export default function Step4HasHome({ onChooseHome, onChooseGoal, prev }) {
  return (
    <div className="step2-container">
      
      {/* Ilustración lateral */}
      <img 
        src={WomanIllustration} 
        alt="Personaje" 
        className="step2-illustration" 
      />

      {/* Burbuja principal */}
      <div className="dialog-box">

        {/* Pregunta 1 */}
        <p className="dialog-small">1.</p>
        <h2 className="dialog-title">¿Actualmente cuentas con vivienda propia?</h2>

        <div className="dialog-options">
          <button onClick={() => onChooseHome('si')} className="dialog-button">a) Sí</button>
          <button onClick={() => onChooseHome('no')} className="dialog-button">b) No</button>
          <button onClick={() => onChooseHome('parcial')} className="dialog-button">
            c) Parcialmente (compartida, en proceso…)
          </button>
        </div>

        {/* Línea divisora */}
        <hr className="dialog-divider" />

        {/* Pregunta 2 */}
        <p className="dialog-small">2.</p>
        <h2 className="dialog-title">¿Cuál es tu objetivo principal?</h2>

        <div className="dialog-options">
          <button onClick={() => onChooseGoal('comprar')} className="dialog-button">a) Comprar vivienda nueva o usada</button>
          <button onClick={() => onChooseGoal('mejorar')} className="dialog-button">b) Mejorar o ampliar mi vivienda actual</button>
          <button onClick={() => onChooseGoal('remodelar')} className="dialog-button">c) Remodelar espacios puntuales</button>
          <button onClick={() => onChooseGoal('inversion')} className="dialog-button">d) Invertir en un inmueble para arrendar</button>
        </div>

        {/* Navegación inferior */}
        <div className="dialog-footer">
          <button onClick={prev} className="dialog-input">Volver</button>
          <span className="progress">Responde ambas preguntas</span>
        </div>

      </div>
    </div>
  );
}
