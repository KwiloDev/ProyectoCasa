import React, { useState } from "react";
import "./Step11Final.css";

// 🔥 IMPORTS DE IMÁGENES
import Icono7 from "../../assets/Iconos/Icono 7.png";
import Icono8 from "../../assets/Iconos/Icono 8.png";
import Personaje8 from "../../assets/Personajes/Personaje 8.png";

export default function Step11Final({ data, prev }) {

  const [showModal, setShowModal] = useState(false);

  const finalizar = () => {
    setShowModal(true);
  };

  const cerrarModal = () => {
    window.location.href = window.location.origin;
  };

  return (
    <div className="step11-page">

      <div className="left-column-11">
        <div className="speech-box-11">

          <h2 className="final-title">¿Tienes dudas?</h2>

          <p className="final-text">
            Escríbenos haciendo click en los siguientes íconos :
          </p>

     <div className="icons-row-11">

  <img 
  src={Icono7}
  alt="WhatsApp"
  className="icon-whatsapp"
  onClick={() =>
    window.open(
      "https://wa.me/573203942723?text=%20%21%20Hola%2C%20quiero%20saber%20m%C3%A1s%20acerca%20del%20proyecto%20de%20vivienda.%21",
      "_blank"
    )
  }
/>


  <img
    src={Icono8}
    alt="Correo"
    className="icon-mail"
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
          src={Personaje8}
          alt="Personaje final"
          className="personaje-11"
        />
      </div>

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
