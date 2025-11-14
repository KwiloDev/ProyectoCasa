import React, { useState } from 'react' // Importar useState
import './Step7Types.css'

export default function Step7Types({ data, update, next, prev }) {
  // 1. Estado para controlar la modal
  const [alertData, setAlertData] = useState(null)

  const choose = (val) => {
    update({ typeOfHousing: val })
    next()
  }

  // Función específica para mostrar la modal de Vivienda No VIS
  const showNoVisModal = () => {
    setAlertData({
      title: 'Vivienda No VIS',
      // Este es el contenido principal que se mostrará en lugar del <p>alertData.message</p>
      content: ( 
        <ul className="modal-list">
          <li>Solicita estudio en salarios mínimos al año de entrega.</li>
          <li>Pregunta por pagos adicionales como avalúos y estudios de títulos.</li>
          <li>Verifica acceso a principales vías y trasporte.</li>
          <li>Pregunta por banco constructor y tasa preferencial en créditos hipotecarios.</li>
        </ul>
      ),
      confirmText: 'Volver', // Texto del botón en la imagen
      onConfirm: () => {
        setAlertData(null); // Cerrar la modal
      },
      // No hay botón de "Cancelar" o "Siguiente" en la imagen, por lo que no lo incluimos
    })
  }
  
  // Función para avanzar al siguiente paso una vez se ha visto la modal
  const handleNoVisConfirm = () => {
    setAlertData(null); // Cerrar la modal
    choose('novis'); // Avanzar al siguiente paso con el valor elegido
  }


  return (
    <div className="step7-types">

      {/* Título grande */}
      <h3>Los tipos de vivienda a los que aplicas son:</h3>
      <p className="step7-subtitle">Elige al que quieres aplicar:</p>

      {/* Grid */}
      <div className="grid sm:grid-cols-3 gap-6 mt-6">

        {/* VIS / VIP */}
        <div className="step7-card">
          {/* ... otros elementos ... */}
          <img
            src="/src/assets/Cajas/Caja 2.png"
            alt="VIS"
            className="step7-icon"
          />
          <h4>Vivienda VIS / VIP</h4>
          <p>
            Las Viviendas de interés social (VIS) o prioritario (VIP)
            aplican para quienes devengan hasta 3 salarios mínimos.
          </p>
          <button onClick={() => choose('vis')} className="btn-house">
            Descubre proyectos inmobiliarios
          </button>
        </div>

        {/* Usada */}
        <div className="step7-card">
          {/* ... otros elementos ... */}
          <img
            src="/src/assets/Cajas/Caja 3_1.png"
            alt="Usada"
            className="step7-icon"
          />
          <h4>Vivienda Usada</h4>
          <p>
            Casas o apartamentos ya habitados que están en venta
            y disponibles para entrega inmediata.
          </p>
          <button onClick={() => choose('usada')} className="btn-house">
            Descubre opciones de vivienda usada
          </button>
        </div>

        {/* No VIS - MODIFICADO */}
        <div className="step7-card">
          {/* ... otros elementos ... */}
          <img
            src="/src/assets/Cajas/Caja 4.png"
            alt="No VIS"
            className="step7-icon"
          />
          <h4>Vivienda No VIS</h4>
          <p>
            Proyectos recién construidos con entregas en máximo 2 años
            o disponibles inmediatamente.
          </p>
          {/* Llama a la nueva función */}
          <button onClick={showNoVisModal} className="btn-house"> 
            Descubre proyectos inmobiliarios
          </button>
        </div>

      </div>

      {/* Botón volver */}
      <div className="mt-6 flex justify-between">
        <button onClick={prev} className="btn-ghost">
          Volver
        </button>
      </div>

      {/* 2. Estructura de la Modal / Alert */}
      {alertData && ( 
        <div className="alert-overlay">
          <div className="alert-box">
            {/* Imagen de la casa, añadida como un div o directamente como un <img> si tienes la ruta */}
            <div className="modal-house-icon">
              {/* Usamos un div placeholder, en producción usarías el componente real o un <img> */}
              <img src="https://via.placeholder.com/150x120/cc5500/ffffff?text=Casa+No+VIS" alt="Vivienda No VIS" />
            </div>

            <h3 className="alert-title">{alertData.title}</h3>

            {/* Renderizar el contenido (la lista) */}
            <div className="alert-content">
               {alertData.content} 
            </div>

            <div className="alert-buttons">
              {/* Botón Volver con el estilo de la imagen */}
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