import React, { useState } from 'react'
import './Step6Subsidy.css'
import Personaje from '../../assets/Personajes/Personaje 4.png'

export default function Step6Subsidy({ data, update, next, prev }) {

  const [alertData, setAlertData] = useState(null)

  const set = (field, val) => update({ [field]: val })

  // ➤ Pregunta 1
  const handleAffiliation = (val) => {
    set('affiliatedToCaja', val)

    if (val === 'si') {
      setAlertData({
        title: "Información importante",
        message: (
          <>
            Al tocar <strong>"Siguiente"</strong> accederás a la página de
            <strong> Compensar</strong> para afiliar a tus beneficiarios.
            Se abrirá una <strong>nueva pestaña</strong>, entonces
            <strong> no perderás tu avance.</strong>
          </>
        ),
        confirmText: "Cerrar",
        onConfirm: () => setAlertData(null),
      })
    }
  }

  // ➤ Botón Siguiente 
  const handleNext = () => {
    const allMatch =
      data.affiliatedToCaja === 'no' &&
      data.incomesUnder4SM === 'si' &&
      data.householdNucleus === 'no' &&
      data.allAffiliated === 'no' &&
      data.houseOwner === 'no' &&
      data.hadSubsidyBefore === 'no'

    if (allMatch) {
      setAlertData({
        title: "Antes de continuar",
        message: (
          <>
            Al tocar <strong>“Siguiente”</strong> accederás a la página
            de <strong>Compensar</strong> para afiliar a tus beneficiarios.
            <br /><br />
            Se abrirá una <strong>nueva pestaña</strong>, entonces<strong><i> no perderás tu avance en la compra de tu vivienda.</i></strong>
          </>
        ),
        cancelText: "Volver",
        confirmText: "Siguiente",
        onCancel: () => setAlertData(null),
        onConfirm: next
      })
    } else {
      next()
    }
  }

  return (
    <div className="step6-container">

      {/* Alert Modal */}
      {alertData && (
        <div className="alert-overlay">
          <div className="alert-box">

            <h3 className="alert-title">{alertData.title}</h3>

            <p className="alert-message">{alertData.message}</p>

            <div className="alert-buttons">
              {alertData.cancelText && (
                <button className="btn-back" onClick={alertData.onCancel}>
                  {alertData.cancelText}
                </button>
              )}

              <button className="btn-next" onClick={alertData.onConfirm}>
                {alertData.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}

      <i>
        <p className="welcome-title">
          Para darte <strong>la mejor asesoría en la compra de tu nueva vivienda,</strong>
          ayúdanos a completar:
        </p>
      </i>

      <div className="content-row">

        {/* Personaje */}
        <div className="character-side">
          <img src={Personaje} alt="personaje" className="character-img" />
        </div>

        {/* Preguntas */}
        <div className="questions-box">

          {/* Pregunta 1 */}
          <div className="question-block">
            <div className="question-text">
              1. ¿Estás afiliado(a) a una caja de compensación familiar?
            </div>
            <div className="options">
              <button
                className={`option-btn ${data.affiliatedToCaja === 'si' ? 'selected' : ''}`}
                onClick={() => handleAffiliation('si')}
              >
                Sí
              </button>

              <button
                className={`option-btn ${data.affiliatedToCaja === 'no' ? 'selected' : ''}`}
                onClick={() => handleAffiliation('no')}
              >
                No
              </button>
            </div>
          </div>

          {/* Pregunta 2 */}
          <div className="question-block">
            <div className="question-text">
              2. ¿Tienes ingresos familiares mensuales inferiores a 4 SMLMV?
            </div>
            <div className="options">
              <button
                className={`option-btn ${data.incomesUnder4SM === 'si' ? 'selected' : ''}`}
                onClick={() => set('incomesUnder4SM', 'si')}
              >
                Sí
              </button>

              <button
                className={`option-btn ${data.incomesUnder4SM === 'no' ? 'selected' : ''}`}
                onClick={() => set('incomesUnder4SM', 'no')}
              >
                No
              </button>
            </div>
          </div>

          {/* Pregunta 3 */}
          <div className="question-block">
            <div className="question-text">3. ¿El hogar está conformado por núcleo familiar?</div>
            <div className="options">
              <button
                className={`option-btn ${data.householdNucleus === 'si' ? 'selected' : ''}`}
                onClick={() => set('householdNucleus', 'si')}
              >
                Sí
              </button>

              <button
                className={`option-btn ${data.householdNucleus === 'no' ? 'selected' : ''}`}
                onClick={() => set('householdNucleus', 'no')}
              >
                No
              </button>
            </div>
          </div>

          {/* Pregunta 4 */}
          <div className="question-block">
            <div className="question-text">4. ¿Todos los integrantes del hogar están afiliados como beneficiarios?</div>
            <div className="options">
              <button
                className={`option-btn ${data.allAffiliated === 'si' ? 'selected' : ''}`}
                onClick={() => set('allAffiliated', 'si')}
              >
                Sí
              </button>

              <button
                className={`option-btn ${data.allAffiliated === 'no' ? 'selected' : ''}`}
                onClick={() => set('allAffiliated', 'no')}
              >
                No
              </button>
            </div>
          </div>

          {/* Pregunta 5 */}
          <div className="question-block">
            <div className="question-text">5. ¿Algún integrante del hogar es propietario de una vivienda?</div>
            <div className="options">
              <button
                className={`option-btn ${data.houseOwner === 'si' ? 'selected' : ''}`}
                onClick={() => set('houseOwner', 'si')}
              >
                Sí
              </button>

              <button
                className={`option-btn ${data.houseOwner === 'no' ? 'selected' : ''}`}
                onClick={() => set('houseOwner', 'no')}
              >
                No
              </button>
            </div>
          </div>

          {/* Pregunta 6 */}
          <div className="question-block">
            <div className="question-text">6. ¿Has sido beneficiario de un subsidio antes?</div>
            <div className="options">
              <button
                className={`option-btn ${data.hadSubsidyBefore === 'si' ? 'selected' : ''}`}
                onClick={() => set('hadSubsidyBefore', 'si')}
              >
                Sí
              </button>

              <button
                className={`option-btn ${data.hadSubsidyBefore === 'no' ? 'selected' : ''}`}
                onClick={() => set('hadSubsidyBefore', 'no')}
              >
                No
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Navegación */}
      <div className="footer-buttons">
        <button className="btn-back" onClick={prev}>← Volver</button>
        <button className="btn-next" onClick={handleNext}>Siguiente</button>
      </div>
    </div>
  )
}
