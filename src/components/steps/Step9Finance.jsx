import React from 'react'
import './Step9Finance.css'

export default function Step9Finance({ data, next, prev }) {
  return (
    <div className="step9-finance">
      <h3>¡Hagamos cuentas!</h3>
      <div className="mt-2">
        <p>100% del valor del inmueble = 30% cuota inicial + 70% crédito hipotecario.</p>
        <p className="mt-2">Recuerda: tu cuota no debe superar 30%-40% de tus ingresos.</p>
      </div>

      <div className="mt-6">
        <button onClick={prev} className="btn-ghost">Volver</button>
        <button onClick={next} className="btn-primary">Siguiente</button>
      </div>
    </div>
  )
}
