import React from "react";
import "./Step10Extras.css";

export default function Step10Extras({ data, update, next, prev }) {

  const chooseExtras = () => {
    update({ extrasChoice: true });
    next();
  };

  return (
    <div className="step10-page">

      {/* IZQUIERDA – PERSONAJE */}
      <div className="left-column-10">
        <img
          src="/src/assets/Personajes/Personaje 7.png"
          alt="Personaje animado"
          className="personaje-step10"
        />
      </div>

      {/* DERECHA – CONTENIDO */}
      <div className="right-column-10">

        {/* BURBUJA AHORA ARRIBA DEL TÍTULO */}
        <div className="speech-bubble-10">
          <div className="speech-bubble-thought"></div> {/* primer punto grande */}
          ¡Estás a un paso de adquirir tu vivienda!
        </div>

        <h3 className="extras-title">
          Recuerda tener presente gastos adicionales como:
        </h3>

        <ul className="extras-list">
          <li>• Pago de escrituras</li>
          <li>• Remodelación</li>
          <li>• Mudanza</li>
        </ul>

        {/* BOTÓN COMO IMAGEN */}
        <img
          src="/src/assets/Botones Click/Click 4.png"
          alt="Opciones para pagos adicionales"
          className="opciones-image"
          onClick={chooseExtras}
        />

        {/* BOTONES INFERIORES */}
        <div className="bottom-buttons-10">
          <button className="btn-volver10" onClick={prev}>Volver</button>
          <button className="btn-siguiente10" onClick={next}>Siguiente</button>
        </div>

      </div>

    </div>
  );
}
