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
      title: "Tu historia importa: cuéntanos de ti",
      // Este es el contenido principal que se mostrará en lugar del <p>alertData.message</p>
      content: (
        <p>
          Queremos conocer a las personas detrás del esfuerzo. Cuéntanos en
          pocas palabras por qué tu trabajo es excepcional, es la oportunidad
          para que compartas cómo tu dedicación ha hecho crecer no solo tu
          camino, sino también el de la empresa.
        </p>
      ),
      confirmText: "Volver", // Texto del botón en la imagen
      onConfirm: () => {
        setAlertData(null); // Cerrar la modal
      },
      // No hay botón de "Cancelar" o "Siguiente" en la imagen, por lo que no lo incluimos
    });
  }
  
  // Función para avanzar al siguiente paso una vez se ha visto la modal
  const handleNoVisConfirm = () => {
    setAlertData(null); // Cerrar la modal
    choose('novis'); // Avanzar al siguiente paso con el valor elegido
  }


  return (
    <div className="step7-types">

      {/* Título grande */}
      <h3>Tipos de vivienda:</h3>
      <p className="step7-subtitle">Acompañamos tu sueño en todas las etapas del camino, escoge una opción de acuerdo en el proceso que estas: </p>

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
          <h4>Semilla de Vivienda</h4>
          <p>
            Para quienes están dando su primer paso.
Ideal si estas en búsqueda de un proyecto o si ya elegiste un proyecto. 
          </p>
          <button onClick={showNoVisModal} className="btn-house">
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
          <h4>Raíces del hogar</h4>
          <p>
            Para quienes ya tienen su sueño en proceso.
Si llevas adelantado el proceso de pago de cuita inicial, estas próximo a pago de escrituras o entrega del apartamento. 
          </p>
          <button onClick={showNoVisModal} className="btn-house">
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
          <h4>Cosechando frutos</h4>
          <p>
            Para quienes ya recibieron su vivienda en obra gris y están proceso de que su hogar florezca.
          </p>
          {/* Llama a la nueva función */}
          <button onClick={showNoVisModal} className="btn-house"> 
            Descubre proyectos inmobiliarios
          </button>
        </div>

      </div>

      {/* Botón volver */}
      <div className="mt-6 flex justify-between">
        <button onClick={prev} className="btn-ghost7">
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
              <img src="/src/assets/Iconos/Icono 1.png" alt="Vivienda No VIS" />
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