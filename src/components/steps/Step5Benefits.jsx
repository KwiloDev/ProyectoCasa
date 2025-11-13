import React from 'react'
import './Step5Benefits.css'

export default function Step5Benefits({ next, prev }) {
  return (
    <div className="step5-container">
      {/* Título principal */}
      <h3 className="step5-title">
        ¡Como ya cuentas con vivienda propia, tenemos estos beneficios para ti!
      </h3>

      {/* Tarjetas de beneficios */}
      <div className="step5-grid">
        <div className="benefit-card">
          <h4>Mejora de vivienda</h4>
          <p>Asesoría y subsidios para mejorar tu vivienda actual.</p>
        </div>

        <div className="benefit-card">
          <h4>Legalización de Documentos</h4>
          <p>Pon al día escrituras, impuestos y otros documentos.</p>
        </div>

        <div className="benefit-card">
          <h4>Administración de viviendas</h4>
          <p>Solicita información en caso de herencias o sucesión.</p>
        </div>
      </div>

      {/* Navegación */}
      <div className="step5-footer">
        <button onClick={prev} className="btn-back">← Volver</button>
        <button onClick={next} className="btn-next">Finalizar</button>
      </div>
    </div>
  )
}
