import React, { useState } from 'react'
import './Step7Types.css'

export default function Step7Types({ data, update, next, prev }) {
  // Modal principal
  const [alertData, setAlertData] = useState(null)

  // Input dentro del modal
  const [userResponse, setUserResponse] = useState("")

  const choose = (val) => {
    update({ typeOfHousing: val })
    next()
  }

  // Modal que se abre al dar clic
  const showNoVisModal = () => {
    setAlertData({
      title: "Tu historia importa: cuéntanos de ti",
      content: (
        <p>
          Queremos conocer a las personas detrás del esfuerzo. Cuéntanos en pocas palabras 
          por qué tu trabajo es excepcional. Es la oportunidad para que compartas cómo tu 
          dedicación ha hecho crecer no solo tu camino, sino también el de la empresa.
        </p>
      ),
      confirmText: "Volver",
      onConfirm: () => setAlertData(null),
    })
  }

  // Acción al enviar la respuesta
  const handleSubmitResponse = () => {
    console.log("Respuesta enviada:", userResponse)

    // Puedes guardar la respuesta en tu flujo si deseas
    // update({ userStory: userResponse })

    setUserResponse("")     // limpiar input
    setAlertData(null)      // cerrar modal
  }

  return (
    <div className="step7-types">

      {/* Título grande */}
      <h3>Acompañamos tu sueño en todas las etapas del camino:</h3>
      <p className="step7-subtitle">
        Escoge una opción de acuerdo en el proceso que estas:
      </p>

      {/* Grid principal */}
      <div className="grid sm:grid-cols-3 gap-6 mt-6">

        {/* Semilla de Vivienda */}
        <div className="step7-card">
          <img
            src="/src/assets/Cajas/Caja 2.png"
            alt="Semilla de Vivienda"
            className="step7-icon"
          />
          <h4>Semilla de Vivienda</h4>
          <p>
            Para quienes están dando su primer paso.
            Ideal si estás en búsqueda de un proyecto o si ya elegiste uno.
          </p>
          <button onClick={showNoVisModal} className="btn-house">
            Descubre proyectos inmobiliarios
          </button>
        </div>

        {/* Raíces del hogar */}
        <div className="step7-card">
          <img
            src="/src/assets/Cajas/Caja 3_1.png"
            alt="Raíces del hogar"
            className="step7-icon"
          />
          <h4>Raíces del hogar</h4>
          <p>
            Para quienes ya tienen su sueño en proceso.
            Si llevas adelantado el pago de cuota inicial o estás próximo a escrituras.
          </p>
          <button onClick={showNoVisModal} className="btn-house">
            Descubre opciones de vivienda usada
          </button>
        </div>

        {/* Cosechando frutos */}
        <div className="step7-card">
          <img
            src="/src/assets/Cajas/Caja 4.png"
            alt="Cosechando frutos"
            className="step7-icon"
          />
          <h4>Cosechando frutos</h4>
          <p>
            Para quienes ya recibieron su vivienda en obra gris y están en proceso de
            hacer que su hogar florezca.
          </p>
          <button onClick={showNoVisModal} className="btn-house">
            Descubre proyectos inmobiliarios
          </button>
        </div>

      </div>

      {/* Botones inferiores */}
      <div className="mt-6 flex justify-between">
        <button onClick={prev} className="btn-ghost7">Volver</button>
        <button className="btn-ghost7" onClick={next}>Siguiente</button>
      </div>

      {/* MODAL */}
      {alertData && (
        <div className="alert-overlay">
          <div className="alert-box">

            {/* Imagen izquierda */}
            <div className="modal-house-icon">
              <img src="/src/assets/Iconos/Icono 1.png" alt="Icono 1" />
            </div>

            <h3 className="alert-title">{alertData.title}</h3>

            {/* Texto dinámico */}
            <div className="alert-content">
              {alertData.content}
            </div>

            {/* INPUT + BOTÓN ENVIAR */}
            <div className="alert-input-wrapper">
              <input
                type="text"
                className="alert-input"
                placeholder="Escribe tu mensaje aquí..."
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
              />

              <button className="btn-modal-submit" onClick={handleSubmitResponse}>
                Enviar
              </button>
            </div>

            {/* Botón volver */}
            <div className="alert-buttons">
              <button className="btn-modal-volver" onClick={alertData.onConfirm}>
                {alertData.confirmText}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
