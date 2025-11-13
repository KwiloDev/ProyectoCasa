import React from 'react'
import './Step4HasHome.css'

export default function Step4HasHome({ onChoose, prev }) {
  return (
    <div className="step4-container">
      {/* Pregunta principal */}
      <p className="step4-question">
        1. ¿Actualmente cuentas con vivienda propia?
      </p>

      {/* Opciones */}
      <div className="step4-options">
        <button onClick={() => onChoose('si')} className="step4-option">
          a) Sí
        </button>
        <button onClick={() => onChoose('no')} className="step4-option">
          b) No
        </button>
        <button onClick={() => onChoose('parcialmente')} className="step4-option">
          c) Parcialmente (compartida, en proceso...)
        </button>
      </div>

      {/* Navegación */}
      <div className="step4-footer">
        <button onClick={prev} className="btn-back">
          ← Volver
        </button>
        <div className="step4-hint">Elige la opción que aplica</div>
      </div>
    </div>
  )
}
