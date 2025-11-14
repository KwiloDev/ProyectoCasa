import React from 'react'
import './Step5Benefits.css'

import mejoraViviendaTool from '../../assets/Iconos/Icono 4.png'
import mejoraViviendaFolio from '../../assets/Iconos/Icono 5.png'
import mejoraViviendaMoney from '../../assets/Iconos/Icono 6.png'
import personaje from '../../assets/Personajes/Personaje 4.png'

export default function Step5Benefits({ next, prev }) {
  return (
    <div className="benefits-container">

      <h3 className="benefits-title">
        ¡Como ya cuentas con vivienda propia,
        <br />
        tenemos estos beneficios para ti!
      </h3>

      {/* Contenedor tarjetas + personaje */}
      <div className="benefits-content">

        {/* GRID DE TARJETAS */}
        <div className="benefits-grid">

          {/* Tarjeta 1 */}
          <div className="benefit-card">
            <h4 className="benefit-card-title">Mejora de vivienda</h4>

            <div className="benefit-card-content">
              <p className="benefit-card-text">
                Conoce y solicita los subsidios
                <br />
                para mejorar tu vivienda.
              </p>

              <img src={mejoraViviendaTool} className="benefit-card-image" />
            </div>
          </div>

          {/* Tarjeta 2 */}
          <div className="benefit-card">
            <h4 className="benefit-card-title">Legalización de Documentos</h4>

            <div className="benefit-card-content">
              <p className="benefit-card-text">
                Pon al día tus escrituras, impuestos
                <br />
                u otros documentos.
              </p>

              <img src={mejoraViviendaFolio} className="benefit-card-image" />
            </div>
          </div>

          {/* Tarjeta 3 */}
          <div className="benefit-card">
            <h4 className="benefit-card-title">Administración de viviendas</h4>

            <div className="benefit-card-content">
              <p className="benefit-card-text">
                Solicita información en caso de herencia
                <br />
                o ayuda para sucesión.
              </p>

              <img src={mejoraViviendaMoney} className="benefit-card-image" />
            </div>
          </div>

        </div>

        {/* PERSONAJE A LA DERECHA */}
        <div className="benefits-character">
          <img src={personaje} alt="Personaje" />
        </div>

      </div>

      <div className="benefits-controls">
        <button className="benefits-btn-back" onClick={prev}>Volver</button>
        <button className="benefits-btn-next" onClick={next}>Finalizar</button>
      </div>

    </div>
  )
}
