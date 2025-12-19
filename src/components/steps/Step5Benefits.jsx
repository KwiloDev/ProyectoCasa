import React from 'react'
import './Step5Benefits.css'

import Caja1 from '/src/assets/Cajas/Caja 1.png'

import mejoraViviendaTool from '/src/assets/Iconos/Icono 4.png'
import mejoraViviendaFolio from '/src/assets/Iconos/Icono 5.png'
import mejoraViviendaMoney from '/src/assets/Iconos/Icono 6.png'

import personaje from '/src/assets/Personajes/Personaje 4.png'

export default function Step5Benefits({ next, prev }) {
  return (
    <div className="benefits-container">

      <h3 className="benefits-title">
        ¡Como ya cuentas con vivienda propia,<br />
        tenemos estos beneficios para ti!
      </h3>

      <div className="benefits-content">

        {/* GRID */}
        <div className="benefits-grid">

          {/* Tarjeta 1 */}
          <div className="benefit-box">
            <img src={Caja1} className="benefit-box-bg" />

            <h4 className="benefit-box-title">Mejora de <br />vivienda</h4>

            <p className="benefit-box-text">
              Conoce y solicita los subsidios <br />
              para mejorar tu vivienda.
            </p>

            <img src={mejoraViviendaTool} className="benefit-box-icon" />
          </div>

          {/* Tarjeta 2 */}
          <div className="benefit-box">
            <img src={Caja1} className="benefit-box-bg" />

            <h4 className="benefit-box-title">Legalización de <br />Documentos</h4>

            <p className="benefit-box-text">
              Pon al día tus escrituras, impuestos <br />
              u otros documentos.
            </p>

            <img src={mejoraViviendaFolio} className="benefit-box-icon" />
          </div>

          {/* Tarjeta 3 */}
          <div className="benefit-box">
            <img src={Caja1} className="benefit-box-bg" />

            <h4 className="benefit-box-title">Administración de <br />viviendas</h4>

            <p className="benefit-box-text">
              Solicita información en caso de herencia <br />
              o ayuda para sucesión.
            </p>

            <img src={mejoraViviendaMoney} className="benefit-box-icon" />
          </div>

        </div>

        {/* Personaje */}
        <div className="benefits-character">
          <img src={personaje} alt="Personaje" />
        </div>

      </div>

      <div className="benefits-controls">
        <button className="benefits-btn-back" onClick={prev}>Volver</button>
        <button className="benefits-btn-next" onClick={next}>Continuar</button>
      </div>
      

    </div>
  )
}
