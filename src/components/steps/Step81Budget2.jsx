import React from 'react';
import './Step81Budget2.css';

export default function Step81Budget2({ data, update, next, prev }) {

  const choose = (val) => { 
    update({ budgetStep81Choice: val });
    next();
  };

  return (
    <div className="step81-page">
      {/* COLUMNA IZQUIERDA */}
      <div className="left-column">
        {/* SECCIÓN 1 */}
        <div className="section-block">
          <h2 className="section-title">
            Cuota
            <br />
            inicial
          </h2>

          <div className="box-card" onClick={() => choose("cuota-inicial")}>
            <img
              src="/src/assets/cajas/Caja 5.png"
              className="box-image"
              alt="Caja cuota"
            />
            <p className="box-text">
              Quieres <b>iniciar con la compra de tu vivienda</b>, pero pagas
              arriendo y <b>no te alcanza para pagar cuota inicial.</b>
            </p>
          </div>
        </div>

        {/* SECCIÓN 2 */}
        <div className="section-block">
          <h2 className="section-title">Subsidios</h2>

          <div className="box-card" onClick={() => choose("subsidios")}>
            <img
              src="/src/assets/cajas/Caja 6.png"
              className="box-image"
              alt="Caja subsidios"
            />
            <p className="box-text box-text-dark">
              Tienes un proceso de compra de vivienda avanzado y quieres saber
              si puedes
              <b> acceder a algún subsidio o beneficio.</b>
            </p>
          </div>
        </div>

        {/* SECCIÓN 3 */}
        <div className="section-block">
          <h2 className="section-title">
            Crédito
            <br />
            hipotecario
          </h2>

          <div className="box-card" onClick={() => choose("credito")}>
            <img
              src="/src/assets/cajas/Caja 7.png"
              className="box-image"
              alt="Caja crédito"
            />
            <p className="box-text">
              Requieres asesoría para solicitar <b>crédito hipotecario</b>,
              capacidad de endeudamiento, historial crediticio y otros.
            </p>
          </div>
        </div>

        {/* BOTONES */}
        <div className="bottom-buttons">
          <button className="btn-volverbud" onClick={prev}>
            Volver
          </button>
          <button className="btn-siguiente" onClick={next}>
            Siguiente
          </button>
        </div>
      </div>

      {/* COLUMNA DERECHA */}
      <div className="right-column">
        <div className="speech-bubble">
          ¡Te acompañamos en tu
          <br />
          planeación financiera!
        </div>

        <img
          src="/src/assets/Personajes/Personaje 6.png"
          className="person-illustration"
          alt="Personaje"
        />
      </div>
    </div>
  );
}
