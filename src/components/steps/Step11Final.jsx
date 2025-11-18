import React from "react";
import "./Step11Final.css";

export default function Step11Final({ data, prev }) {

  const finalizar = () => {
    alert("Gracias por completar el formulario. ¡Pronto nos pondremos en contacto contigo!");
  };

  return (
    <div className="step11-page">

      {/* Izquierda – BURBUJA de diálogo */}
      <div className="left-column-11">
        <div className="speech-box-11">

          <h2 className="final-title">¿Tienes dudas?</h2>

          <p className="final-text">
            Escríbenos tocando los siguientes íconos:
          </p>

          <div className="icons-row-11">
            {/* WhatsApp */}
            <img
              src="/src/assets/Iconos/Icono 7.png"
              alt="WhatsApp"
              className="contact-icon"
              onClick={() => window.open("https://wa.me/+576016767610", "_blank")}
            />

            {/* Correo */}
            <img
              src="/src/assets/Iconos/Icono 8.png"
              alt="Correo"
              className="contact-icon"
              onClick={() => window.open("https://www.crepesywaffles.com/contacto")}
            />
          </div>

        </div>

        {/* BOTÓN FINALIZAR */}
        <button className="btn-finalizar-11" onClick={finalizar}>
          Finalizar
        </button>
      </div>

      {/* Derecha – PERSONAJE */}
      <div className="right-column-11">
        <img
          src="/src/assets/Personajes/Personaje 8.png"
          alt="Personaje final"
          className="personaje-11"
        />
      </div>

    </div>
  );
}
