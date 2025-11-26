import React, { useState } from 'react'
import './Step7Types.css'

// 👉 Importaciones correctas
import Caja2 from '../../assets/Cajas/Caja 2.png'
import Caja3_1 from '../../assets/Cajas/Caja 3_1.png'
import Caja4 from '../../assets/Cajas/Caja 4.png'
import Icono1 from '../../assets/Iconos/Icono 1.png'

export default function Step7Types({ data, update, next, prev }) {

  const [alertData, setAlertData] = useState(null)
  const [userResponse, setUserResponse] = useState("")

  const showNoVisModal = (type) => {

    update({ typeOfHousing: type })

    setAlertData({
      title: "Tu historia importa: cuéntanos de ti",
      content: (
        <p>
          Queremos conocer a las personas detrás del esfuerzo. Cuéntanos en pocas palabras 
          por qué tu trabajo es excepcional. Es la oportunidad para que compartas cómo tu 
          dedicación ha hecho crecer no solo tu camino, sino también el de la empresa.
        </p>
      ),
      confirmText: "Volver",
      onConfirm: () => setAlertData(null)
    })
  }

 const handleSubmitResponse = async () => {
  update({ userResponse });

  const payload = {
    data: {
      documento: Number(data.document),
      res_v: {
        hasHome: data.hasHome,
        homeGoal: data.homeGoal,
        typeOfHousing: data.typeOfHousing,
        userResponse: userResponse
      }
    }
  };

  try {
    const res = await fetch(
      "https://macfer.crepesywaffles.com/api/cvivienas111-del-futuros",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    const result = await res.json();
    console.log("Envío unificado exitoso:", result);

    setUserResponse("");
    setAlertData(null);

    next();

  } catch (err) {
    console.error("Error enviando datos:", err);
  }
};


  return (
    <div className="step7-types">

      <h3>Acompañamos tu sueño en todas las etapas del camino:</h3>
      <p className="step7-subtitle">Escoge una opción de acuerdo al proceso que estas:</p>

      <div className="grid sm:grid-cols-3 gap-6 mt-6">

        <div className="step7-card">
          <img src={Caja2} className="step7-icon" />
          <h4>Semilla de Vivienda</h4>
          <p>Para quienes están dando su primer paso.</p>
          <button onClick={() => showNoVisModal("semilla")} className="btn-house">
              Quiero aplicar 
          </button>
        </div>

        <div className="step7-card">
          <img src={Caja3_1} className="step7-icon" />
          <h4>Raíces del hogar</h4>
          <p>Para quienes ya tienen su sueño en proceso.</p>
          <button onClick={() => showNoVisModal("raices")} className="btn-house">
            Quiero aplicar 
          </button>
        </div>

        <div className="step7-card">
          <img src={Caja4} className="step7-icon" />
          <h4>Cosechando frutos</h4>
          <p>Para quienes ya recibieron su vivienda en obra gris.</p>
          <button onClick={() => showNoVisModal("frutos")} className="btn-house">
           Quiero aplicar 
          </button>
        </div>

      </div>

      <div className="mt-6 flex justify-between">
        <button onClick={prev} className="btn-ghost7">Volver</button>
        <button onClick={next} className="btn-ghost7">Siguiente</button>
      </div>

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

              <button className="btn-modal-submit" onClick={handleSubmitResponse}>
                Enviar
              </button>
            </div>

            <div className="alert-buttons">
              <button className="btn-modal-volver" onClick={alertData.onConfirm}>
                {alertData.confirmText}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
