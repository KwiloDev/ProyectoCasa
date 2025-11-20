import React, { useState } from 'react';
import './Step4HasHome.css';

export default function Step4HasHome({ onChoose, prev }) {

  const [hasHome, setHasHome] = useState(null);
  const [homeGoal, setHomeGoal] = useState(null);
  const [otherGoal, setOtherGoal] = useState(''); // campo para "Otro"

  const canContinue = hasHome !== null && homeGoal !== null && (homeGoal !== 'otro' || otherGoal.trim() !== '');

  const handleNext = () => {
    if (!canContinue) return;

    onChoose({
      hasHome,
      homeGoal: homeGoal === 'otro' ? otherGoal : homeGoal
    });
  };

  return (
    <div className="step4-wrapper">

      {/* Personaje */}
      <div className="step4-illustration">
        <img src="/src/assets/Personajes/Personaje 3.png" alt="Personaje" />
      </div>

      {/* Contenedor principal */}
      <div className="step4-card">

        {/* Pregunta 1 */}
        <h3 className="step4-question">
          1. ¿Actualmente cuentas con vivienda propia?
        </h3>

        <div className="step4-options">
          <button 
            onClick={() => setHasHome('si')} 
            className={`step4-option ${hasHome === 'si' ? 'selected' : ''}`}
          >
            a) Sí
          </button>

          <button 
            onClick={() => setHasHome('no')} 
            className={`step4-option ${hasHome === 'no' ? 'selected' : ''}`}
          >
            b) No
          </button>

          <button 
            onClick={() => setHasHome('parcialmente')} 
            className={`step4-option ${hasHome === 'parcialmente' ? 'selected' : ''}`}
          >
            c) En proceso de compra.
          </button>
        </div>

        {/* Pregunta 2 */}
        <h3 className="step4-question mt-6">
          2. ¿Cuál sería tu objetivo principal respecto a vivienda?
        </h3>

        <div className="step4-options grid-2">
          <button 
            onClick={() => setHomeGoal('primera')}
            className={`step4-option ${homeGoal === 'primera' ? 'selected' : ''}`}
          >
            a) Comprar mi primera vivienda
          </button>

          <button 
            onClick={() => setHomeGoal('mejorar')}
            className={`step4-option ${homeGoal === 'mejorar' ? 'selected' : ''}`}
          >
            b) Mejorar mi vivienda actual
          </button>

          <button 
            onClick={() => setHomeGoal('zona')}
            className={`step4-option ${homeGoal === 'zona' ? 'selected' : ''}`}
          >
            c) Cambiarme a una zona diferente
          </button>

          <button 
            onClick={() => setHomeGoal('subsidios')}
            className={`step4-option ${homeGoal === 'subsidios' ? 'selected' : ''}`}
          >
            d) Acceder a subsidios / beneficios
          </button>

          {/* NUEVA OPCIÓN OTRO */}
          <button 
            onClick={() => setHomeGoal('otro')}
            className={`step4-option ${homeGoal === 'otro' ? 'selected' : ''}`}
          >
            e) Otro
          </button>
        </div>

        {/* Campo de texto cuando elige OTRO */}
        {homeGoal === 'otro' && (
          <input
            type="text"
            className="step4-input"
            placeholder="Escribe tu opción..."
            value={otherGoal}
            onChange={(e) => setOtherGoal(e.target.value)}
          />
        )}

        {/* Navegación */}
        <div className="step4-nav">
          <button onClick={prev} className="btn-back">Volver</button>

          <button 
            onClick={handleNext} 
            className={`btn-next ${!canContinue ? 'disabled' : ''}`}
            disabled={!canContinue}
          >
            Siguiente
          </button>
        </div>

      </div>
    </div>
  );
}
