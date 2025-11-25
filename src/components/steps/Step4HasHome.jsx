import React, { useState } from 'react';
import './Step4HasHome.css';

// 👉 Importación correcta
import Personaje3 from '../../assets/Personajes/Personaje 3.png';

export default function Step4HasHome({ onChoose, prev, userDocument }) {

  const [hasHome, setHasHome] = useState(null);
  const [homeGoal, setHomeGoal] = useState(null);
  const [otherGoal, setOtherGoal] = useState('');

  const canContinue =
    hasHome !== null &&
    homeGoal !== null &&
    (homeGoal !== 'e) Otro' || otherGoal.trim() !== '');

  const handleNext = () => {
    if (!canContinue) return;

    const respuestas = {
      hasHome,
      homeGoal: homeGoal === 'e) Otro' ? otherGoal : homeGoal
    };

    if (onChoose) onChoose(respuestas);
  };

  return (
    <div className="step4-wrapper">

      <div className="step4-illustration">
        {/* 👉 Reemplazo la ruta por la importación */}
        <img src={Personaje3} alt="Personaje" />
      </div>

      <div className="step4-card">

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
            onClick={() => setHasHome('c) En proceso de compra.')}
            className={`step4-option ${hasHome === 'c) En proceso de compra.' ? 'selected' : ''}`}
          >
            c) En proceso de compra.
          </button>
        </div>

        <h3 className="step4-question mt-6">
          2. ¿Cuál sería tu objetivo principal respecto a vivienda?
        </h3>

        <div className="step4-options grid-2">
          <button
            onClick={() => setHomeGoal('a) Comprar mi primera vivienda')}
            className={`step4-option ${homeGoal === 'a) Comprar mi primera vivienda' ? 'selected' : ''}`}
          >
            a) Comprar mi primera vivienda
          </button>

          <button
            onClick={() => setHomeGoal('b) Mejorar mi vivienda actual')}
            className={`step4-option ${homeGoal === 'b) Mejorar mi vivienda actual' ? 'selected' : ''}`}
          >
            b) Mejorar mi vivienda actual
          </button>

          <button
            onClick={() => setHomeGoal('c) Cambiarme a una zona diferente')}
            className={`step4-option ${homeGoal === 'c) Cambiarme a una zona diferente' ? 'selected' : ''}`}
          >
            c) Cambiarme a una zona diferente
          </button>

          <button
            onClick={() => setHomeGoal('d) Acceder a subsidios / beneficios')}
            className={`step4-option ${homeGoal === 'd) Acceder a subsidios / beneficios' ? 'selected' : ''}`}
          >
            d) Acceder a subsidios / beneficios
          </button>

          <button
            onClick={() => setHomeGoal('e) Otro')}
            className={`step4-option ${homeGoal === 'e) Otro' ? 'selected' : ''}`}
          >
            e) Otro
          </button>
        </div>

       {homeGoal === 'e) Otro' && (
  <input
    type="text"
    className="step4-input"
    placeholder="Escribe tu opción..."
    value={otherGoal}
    onChange={(e) => setOtherGoal(e.target.value)}
  />
)}


        <div className="step4-nav">
          <button onClick={prev} className="btn-back">
            Volver
          </button>

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
