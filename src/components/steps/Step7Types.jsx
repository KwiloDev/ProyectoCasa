import React, { useState } from "react";
import "./Step7Types.css";

// 👉 Importaciones correctas
import Caja2 from "/src/assets/Cajas/Caja 2.png";
import Caja3_1 from "/src/assets/Cajas/Caja 3_1.png";
import Caja4 from "/src/assets/Cajas/Caja 4.png";
import Icono1 from "/src/assets/Iconos/Icono 1.png";

export default function Step7Types({ data, update, next, prev }) {
  const [alertData, setAlertData] = useState(null);
  const [userResponse, setUserResponse] = useState("");
  const [completed, setCompleted] = useState(false);
  const [alertRequired, setAlertRequired] = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false); 
  const [existsInAPI, setExistsInAPI] = useState(false);


  // 🔍 Verifica si ya existe un registro con ese documento
  const checkIfExists = async (document) => {
    try {
      const url = `https://macfer.crepesywaffles.com/api/cvivienas111-del-futuros?filters[documento][$eq]=${document}`;
      const res = await fetch(url);
      const json = await res.json();
      return json?.data && json.data.length > 0;
    } catch (err) {
      return false;
    }
  };

  const showNoVisModal = (type) => {
    update({ typeOfHousing: type });

    setAlertData({
      title: "Tu historia importa: Cuéntanos de ti",
      content: (
        <p>
          Queremos conocer a las personas detrás del esfuerzo. Cuéntanos en
          pocas palabras por qué tu trabajo es excepcional. Es la oportunidad
          para que compartas cómo tu dedicación ha hecho crecer no solo tu
          camino, sino también el de la empresa.
        </p>
      ),
      confirmText: "Volver",
      onConfirm: () => setAlertData(null),
    });
  };

  const handleSubmitResponse = async () => {
    if (!userResponse.trim()) {
      setAlertRequired(true);
      return;
    }

    setLoading(true);

    // 🔍 Paso 1: Verificar si ya existe registro previo
    const exists = await checkIfExists(data.document);

    if (exists) {
      setLoading(false);
      setAlreadyExists(true);
      return;
    }

    // 👉 Paso 2: Enviar respuesta normalmente
    update({ userResponse });

    const payload = {
      data: {
        documento: Number(data.document),
        res_v: {
          hasHome: data.hasHome,
          homeGoal: data.homeGoal,
          typeOfHousing: data.typeOfHousing,
          userResponse: userResponse,
        },
      },
    };

    try {
      const res = await fetch(
        "https://macfer.crepesywaffles.com/api/cvivienas111-del-futuros",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      await res.json();

      setUserResponse("");
      setAlertData(null);
      setLoading(false);

      setCompleted(true);
      setSuccessModal(true); // ← MOSTRAR MODAL DE ÉXITO
    } catch (err) {
      console.error("Error enviando datos:", err);
      setLoading(false);
    }
  };
  React.useEffect(() => {
  const verify = async () => {
    const exists = await checkIfExists(data.document);
    if (exists) {
      setExistsInAPI(true);
      setCompleted(true); // Permite avanzar automáticamente
    }
  };
  verify();
}, []);


  return (
    <div className="step7-types">
      <h3>Acompañamos tu sueño en todas las etapas del camino:</h3>
      <p className="step7-subtitle">
        Escoge una opción de acuerdo al proceso que estas:
      </p>

      <div className="grid sm:grid-cols-3 gap-6 mt-6">
        <div className="step7-card">
          <img src={Caja2} className="step7-icon" />
          <h4>Semilla de Vivienda</h4>
          <p>Para quienes están dando su primer paso.</p>
          <button
            onClick={() => showNoVisModal("semilla")}
            className="btn-house"
          >
            Quiero aplicar
          </button>
        </div>

        <div className="step7-card">
          <img src={Caja3_1} className="step7-icon" />
          <h4>Raíces del hogar</h4>
          <p>Para quienes ya tienen su sueño en proceso.</p>
          <button
            onClick={() => showNoVisModal("raices")}
            className="btn-house"
          >
            Quiero aplicar
          </button>
        </div>

        <div className="step7-card">
          <img src={Caja4} className="step7-icon" />
          <h4>Cosechando frutos</h4>
          <p>Para quienes ya recibieron su vivienda en obra gris.</p>
          <button
            onClick={() => showNoVisModal("frutos")}
            className="btn-house"
          >
            Quiero aplicar
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button onClick={prev} className="btn-ghost7">
          Volver
        </button>

        <button
  className={`btn-ghost7 ${(!completed && !existsInAPI) ? "btn-disabled" : ""}`}
  onClick={async () => {

    // Si ya existe en API → permitir continuar
    if (existsInAPI) {
      next();
      return;
    }

    // Si ya completó en este paso → permitir continuar
    if (completed) {
      next();
      return;
    }

    // Si NO existe y NO completó → bloquear
    setAlertRequired(true);
  }}
>
  Siguiente
</button>

      </div>

      {/* 🟧 Modal principal */}
      {alertData && (
        <div className="alert-overlay">
          <div className="alert-box">
            <div className="modal-house-icon">
              <img src={Icono1} alt="Icono 1" />
            </div>

            <h3 className="alert-title">{alertData.title}</h3>

            <div className="alert-content">{alertData.content}</div>

            <div className="alert-input-wrapper">
              <input
                type="text"
                className="alert-input"
                placeholder="Escribe tu mensaje aquí..."
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
              />

              <button
                className="btn-modal-submit"
                onClick={handleSubmitResponse}
                disabled={loading}
              >
                {loading ? <div className="spinner"></div> : "Enviar"}
              </button>
            </div>

            <div className="alert-buttons">
              <button
                className="btn-modal-volver"
                onClick={alertData.onConfirm}
              >
                {alertData.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔔 Modal advertencia si no diligenció */}
      {alertRequired && (
        <div className="alert-overlay">
          <div className="alert-box">
            <h3 className="alert-title">Falta completar la información</h3>
            <p>Debes escribir tu mensaje antes de continuar.</p>

            <button
              className="btn-modal-volver"
              onClick={() => setAlertRequired(false)}
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* 🔴 Modal si el documento ya existe */}
      {alreadyExists && (
        <div className="alert-overlay">
          <div className="alert-box">
            <h3 className="alert-title">Ya realizaste este proceso</h3>
            <p>
              Nuestro sistema muestra que ya enviaste esta información
              anteriormente. Si crees que es un error, comunícate con el equipo
              encargado.
            </p>

            <button
              className="btn-modal-volver"
              onClick={() => setAlreadyExists(false)}
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* 🟢 MODAL DE ÉXITO */}
      {successModal && (
        <div className="alert-overlay">
          <div className="alert-box">
            {/* Ícono animado */}
            <div className="success-icon">
              <span className="checkmark">✔</span>
            </div>

            <h3 className="alert-title">Información enviada con éxito</h3>
            <p>
              Hemos recibido tu información correctamente. Gracias por compartir
              tu historia.
            </p>

            <button
              className="btn-modal-volver"
              onClick={() => {
                setSuccessModal(false);
                next(); // Avanzar al siguiente paso
              }}
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
