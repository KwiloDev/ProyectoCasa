import React, { useState } from 'react';
import './Step4HasHome.css';
import Personaje3 from '../../assets/Personajes/Personaje 3.png';

export default function Step4HasHome({ onChoose, prev, userDocument }) {

  const [hasHome, setHasHome] = useState(null);
  const [homeGoal, setHomeGoal] = useState(null);
  const [otherGoal, setOtherGoal] = useState('');

  // 🎯 Opciones originales
  const goalOptions = [
    { id: 'a', text: 'a) Comprar mi primera vivienda' },
    { id: 'b', text: 'b) Mejorar mi vivienda actual' },
    { id: 'c', text: 'c) Cambiarme a una zona diferente' },
    { id: 'd', text: 'd) Acceder a subsidios / beneficios' },
    { id: 'e', text: 'e) Otro' }
  ];

  // 🎯 Filtro dinámico según la respuesta de la primera pregunta
  const filteredGoals = goalOptions.filter(option => {
    if (hasHome === 'si') {
      // Si tiene vivienda → permitir b, c, e
      return ['b', 'c', 'e'].includes(option.id);
    } else if (hasHome === 'no' || hasHome === 'c) En proceso de compra.') {
      // Si NO tiene vivienda → permitir a, d, e
      return ['a', 'd', 'e'].includes(option.id);
    }
    // Si aún no ha respondido la primera pregunta → no mostrar nada
    return false;
  });

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
        <img src={Personaje3} alt="Personaje" />
      </div>

      <div className="step4-card">

        {/* =============================================== */}
        {/* PREGUNTA 1 */}
        {/* =============================================== */}

        <h3 className="step4-question">
          1. ¿Actualmente cuentas con vivienda propia?
        </h3>

        <div className="step4-options">
          <button
            onClick={() => { setHasHome('si'); setHomeGoal(null); }}
            className={`step4-option ${hasHome === 'si' ? 'selected' : ''}`}
          >
            a) Sí
          </button>

          <button
            onClick={() => { setHasHome('no'); setHomeGoal(null); }}
            className={`step4-option ${hasHome === 'no' ? 'selected' : ''}`}
          >
            b) No
          </button>

          <button
            onClick={() => { setHasHome('c) En proceso de compra.'); setHomeGoal(null); }}
            className={`step4-option ${hasHome === 'c) En proceso de compra.' ? 'selected' : ''}`}
          >
            c) En proceso de compra.
          </button>
        </div>


        {/* =============================================== */}
        {/* PREGUNTA 2 FILTRADA */}
        {/* =============================================== */}

        {hasHome !== null && (
          <>
            <h3 className="step4-question mt-6">
              2. ¿Cuál sería tu objetivo principal respecto a vivienda?
            </h3>

            <div className="step4-options grid-2">

              {goalOptions.map(option => {
                const disabled = !filteredGoals.includes(option);

                return (
                  <button
                    key={option.id}
                    onClick={() => !disabled && setHomeGoal(option.text)}
                    className={`step4-option 
                      ${homeGoal === option.text ? 'selected' : ''} 
                      ${disabled ? 'disabled' : ''}`}
                    disabled={disabled}
                  >
                    {option.text}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Campo "Otro" */}
        {homeGoal === 'e) Otro' && (
          <input
            type="text"
            className="step4-input"
            placeholder="Escribe tu opción..."
            value={otherGoal}
            onChange={(e) => setOtherGoal(e.target.value)}
          />
        )}


        {/* =============================================== */}
        {/* NAV */}
        {/* =============================================== */}

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
