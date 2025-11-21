import React, { useState } from "react";
import "./Step11Final.css";

export default function Step11Final({ data, prev }) {

  const [showModal, setShowModal] = useState(false);

  const finalizar = () => {
    setShowModal(true);
  };

  const cerrarModal = () => {
    // Redirigir al inicio
    window.location.href = window.location.origin;
  };

  return (
    <div className="step11-page">

      {/* Izquierda – BURBUJA de diálogo */}
      <div className="left-column-11">
        <div className="speech-box-11">

          <h2 className="final-title">¿Tienes dudas?</h2>

          <p className="final-text">
            Escríbenos tocando los siguientes íconos :
          </p>

          <div className="icons-row-11">
            <img
              src="/src/assets/Iconos/Icono 7.png"
              alt="WhatsApp"
              className="contact-icon"
              onClick={() => window.open("https://wa.me/+576016767610", "_blank")}
            />

            <img
              src="/src/assets/Iconos/Icono 8.png"
              alt="Correo"
              className="contact-icon"
              onClick={() => window.open("https://www.crepesywaffles.com/contacto")}
            />
          </div>

        </div>

        <div className="buttons-row-11">
          <button className="btn-volver-11" onClick={prev}>
            Volver
          </button>

          <button className="btn-finalizar-11" onClick={finalizar}>
            Finalizar
          </button>
        </div>
      </div>

      <div className="right-column-11">
        <img
          src="/src/assets/Personajes/Personaje 8.png"
          alt="Personaje final"
          className="personaje-11"
        />
      </div>

      {/* 🌟 MODAL ELEGANTE */}
      {showModal && (
        <div className="modal-overlay-11">
          <div className="modal-box-11">
            <h3 className="modal-title-11">
              ¡Formulario enviado con éxito!
            </h3>

            <p className="modal-message-11">
              Gracias por completar el formulario.  
              <br />
              ¡Pronto nos pondremos en contacto contigo!
            </p>

            <button className="modal-button-11" onClick={cerrarModal}>
              Aceptar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
