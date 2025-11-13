import React, { useState } from 'react';
import './Step2Document.css';
import WomanIllustration from '../../assets/Personajes/Personaje 2.png';

export default function Step2Document({ data, update, next }) {
  const [doc, setDoc] = useState(data.document || '');
  const [error, setError] = useState('');

  const handle = () => {
    if (!doc || doc.length < 6) {
      setError('Ingresa un número de documento válido (mínimo 6 dígitos).');
      return;
    }
    update({ document: doc });
    setError('');
    next();
  };

  return (
    <div className="step2-container">
      {/* Imagen de la asesora */}
      <img
        src={WomanIllustration}
        alt="Asesora de vivienda"
        className="step2-illustration"
      />

      {/* Burbuja / cuadro de diálogo */}
      <div className="dialog-box">
        <p className="dialog-small">Ingresa tu</p>
        <h1 className="dialog-title">número de documento</h1>

        <input
          className="dialog-input"
          type="text"
          value={doc}
          onChange={e => setDoc(e.target.value.replace(/\s/g, ''))}
          placeholder="Número de Documento"
        />

        {error && <div className="error-message">{error}</div>}

        <button onClick={handle} className="dialog-button">
          Continuar
        </button>
      </div>

     
    </div>
  );
}
