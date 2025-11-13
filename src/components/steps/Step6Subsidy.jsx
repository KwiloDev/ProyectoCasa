import React from 'react'
import './Step6Subsidy.css'

export default function Step6Subsidy({ data, update, next, prev, openModal }) {
  const set = (field, val) => update({ [field]: val })

  const handleAffiliation = (val) => {
    set('affiliatedToCaja', val)
    if (val === 'si') {
      openModal(
        <div>
          <p>
            Al tocar <strong>Siguiente</strong> accederás a la página de <strong>Compensar</strong> para afiliar a tus beneficiarios.
            Se abrirá en una nueva pestaña y <strong>no perderás tu avance</strong>.
          </p>
        </div>
      )
    }
  }

  return (
    <div className="step6-container">
      {/* Texto principal */}
      <p className="intro-text">
        Para darte la mejor asesoría en la compra de tu nueva vivienda, ayúdanos a completar:
      </p>

      {/* Sección de preguntas */}
      <div className="questions-container">
        <div className="question-block">
          <div className="question-text">¿Estás afiliado(a) a una caja de compensación familiar?</div>
          <div className="options">
            <button onClick={() => handleAffiliation('si')} className="option-btn">Sí</button>
            <button onClick={() => handleAffiliation('no')} className="option-btn">No</button>
          </div>
        </div>

        <div className="question-block">
          <div className="question-text">¿Tienes ingresos familiares mensuales inferiores a 4 SMLMV?</div>
          <div className="options">
            <button onClick={() => set('incomesUnder4SM', 'si')} className="option-btn">Sí</button>
            <button onClick={() => set('incomesUnder4SM', 'no')} className="option-btn">No</button>
          </div>
        </div>

        <div className="question-block">
          <div className="question-text">¿El hogar está conformado por núcleo familiar?</div>
          <div className="options">
            <button onClick={() => set('householdNucleus', 'si')} className="option-btn">Sí</button>
            <button onClick={() => set('householdNucleus', 'no')} className="option-btn">No</button>
          </div>
        </div>

        <div className="question-block">
          <div className="question-text">¿Has sido beneficiario de un subsidio familiar de vivienda antes?</div>
          <div className="options">
            <button onClick={() => set('hadSubsidyBefore', 'si')} className="option-btn">Sí</button>
            <button onClick={() => set('hadSubsidyBefore', 'no')} className="option-btn">No</button>
          </div>
        </div>
      </div>

      {/* Navegación inferior */}
      <div className="footer-buttons">
        <button onClick={prev} className="btn-back">← Volver</button>
        <button onClick={next} className="btn-next">Siguiente</button>
      </div>
    </div>
  )
}
