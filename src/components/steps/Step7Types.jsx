import React from 'react'
import './Step7Types.css'

export default function Step7Types({ data, update, next, prev }) {
  const choose = (val) => {
    update({ typeOfHousing: val })
    next()
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

        {/* No VIS */}
        <div className="step7-card">
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
          <button onClick={() => choose('novis')} className="btn-house">
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
    </div>
  )
}
