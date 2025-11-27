import React, { useState } from 'react';
import './Step2Document.css';
import WomanIllustration from '../../assets/Personajes/Personaje 2.png';

export default function Step2Document({ data, update, next }) {
  const [doc, setDoc] = useState(data.document || '');
  const [error, setError] = useState('');
  const [alertData, setAlertData] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkEmployee = async (document) => {
    try {
      const url = `https://apialoha.crepesywaffles.com/intellinext2?dui_person=${document}`;
      const res = await fetch(url);
      const json = await res.json();
      return Array.isArray(json) && json.length > 0;
    } catch (err) {
      return false;
    }
  };

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

  const handle = async () => {
    if (!doc || doc.length < 6) {
      setError('Ingresa un número de documento válido (mínimo 6 dígitos).');
      return;
    }

    setLoading(true);

    const isEmployee = await checkEmployee(doc);

    if (!isEmployee) {
      setLoading(false);
      setAlertData({
        title: "No autorizado",
        message: `El documento ${doc} no se encuentra registrado como empleado. 
No es posible continuar con el formulario.`,
        button: "Cerrar"
      });
      return;
    }

    const exists = await checkIfExists(doc);
    setLoading(false);

    if (exists) {
      setAlertData({
        title: "Formulario Finalizado",
        message: `El documento ${doc} ya tiene un registro activo. 
No es posible volver a diligenciar el formulario.`,
        button: "Aceptar"
      });
      return;
    }

    update({ document: doc });
    setError('');
    next();
  };

  const goToAdmin = () => {
    window.location.href = "/admin";
  };

  return (
    <div className="step2-container">

      {/* ⭐ Botón ajustado al lugar exacto que pediste ⭐ */}
      <button className="admin-access-button" onClick={goToAdmin}>
        Panel Administrativo
      </button>

      <img
        src={WomanIllustration}
        alt="Asesora de vivienda"
        className="step2-illustration"
      />

      <div className="dialog-box">
        <p className="dialog-small">Ingresa tu:</p>
        <h1 className="dialog-title">Número de documento</h1>

        <input
          className="dialog-input"
          type="number"
          value={doc}
          onChange={(e) => setDoc(e.target.value.replace(/\s/g, ""))}
          placeholder="Número de Documento"
          onKeyDown={(e) => {
            if (e.key === "Enter") handle();
          }}
        />

        {error && <div className="error-message">{error}</div>}

        <button onClick={handle} className="dialog-button" disabled={loading}>
          {loading ? "Verificando..." : "Continuar"}
        </button>
      </div>

      {alertData && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2 className="modal-title">{alertData.title}</h2>
            <p className="modal-message">{alertData.message}</p>
            <button className="modal-button" onClick={() => setAlertData(null)}>
              {alertData.button}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
