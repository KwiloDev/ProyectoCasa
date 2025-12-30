import React, { useState } from "react";
import "./Step9Finance.css";

export default function Step9Finance({ data, next, prev ,goToEstimador }) {
  const [showFirstModal, setShowFirstModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showThirdModal, setShowThirdModal] = useState(false); // 🔥 NUEVA MODAL

  // Abrir modales según sección
  const openModal30 = () => setShowFirstModal(true);
  const openModal70 = () => setShowSecondModal(true);
  const openModal100 = () => setShowThirdModal(true); // 🔥 AL CLICK DEL 100%

  const closeFirstModal = () => setShowFirstModal(false);
  const closeSecondModal = () => setShowSecondModal(false);
  const closeThirdModal = () => setShowThirdModal(false); // 🔥 CIERRE

  return (
    <div className="step9-page">

      {/* ========== MODAL 1 (30%) ========== */}
      {showFirstModal && (
        <div className="modal-overlay">
          <div className="modal-box big-modal">
            <h2 className="modal-title">
              La cuota inicial puede venir de las siguientes fuentes:
            </h2>

            <div className="modal-grid-1">
              <div className="modal-item">
                <img src="/src/assets/Iconos/Icono 3.png" alt="" />
                <p>Ahorros propios</p>
              </div>

              <div className="modal-item">
                <img src="/src/assets/Iconos/Icono 4.png" alt="" />
                <p>Subsidios de vivienda</p>
              </div>

              <div className="modal-item">
                <img src="/src/assets/Iconos/Icono 6.png" alt="" />
                <p>Plan de pagos constructora</p>
              </div>

              <div className="modal-item">
                <img src="/src/assets/Iconos/Icono 5.png" alt="" />
                <p>Cesantías</p>
              </div>
              <div className="modal-item">
                <p>Solicita tus cesantías</p>
                <img src="/src/assets/Botones Click/Click 1.png" alt="" />
                
              </div>
            </div>

            <button className="modal-btn" onClick={closeFirstModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* ========== MODAL 2 (70%) ========== */}
      {showSecondModal && (
        <div className="modal-overlay">
          <div className="modal-box big-modal">
            <h2 className="modal-title">Ten en cuenta:</h2>

            <div className="modal-grid-2">
              <div className="modal-card card-capacidad">
                <h4>Capacidad de endeudamiento</h4>
                <p>
                  Tu cuota mensual no puede superar entre <strong>30% y 40%</strong> de tus ingresos.
                </p>
                <p className="formula">
                  (Ingresos – gastos fijos) × 40% = cuota máxima posible.
                </p>
              </div>

              <div className="modal-card">
                <h4>Historial crediticio</h4>
                <p>Buena calificación en centrales de riesgo.</p>
              </div>

              <div className="modal-card card-tasa">
                <h4>Tipo de tasa de interés</h4>
                <p><strong>Tasa fija:</strong> misma cuota toda la vida del crédito.</p>
                <p><strong>UVR:</strong> ajusta según inflación.</p>
              </div>

              <div className="modal-card card-documentos">
                <h4>Documentos requeridos</h4>

                <div className="card-content-4">
                  <ul className="document-list">
                    <li>Cédula ampliada al 150%</li>
                    <li>Certificación laboral</li>
                    <li>Extractos bancarios</li>
                    <li>Declaración de renta (si aplica)</li>
                    <li>Preaprobación de subsidio</li>
                    <li>Promesa de compraventa</li>
                  </ul>

                  <div className="action-box">
                    <p>Solicita tus certificados</p>
                    <p><strong>Haz clic aquí</strong></p>
                  </div>
                </div>
              </div>

              <div className="modal-card">
                <h4>Plazo del crédito</h4>
                <p>Normalmente entre 15 y 30 años.</p>
                <p><strong>Recomendación:</strong> elige el menor plazo posible.</p>
              </div>
            </div>

            <button className="modal-btn" onClick={closeSecondModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* ========== MODAL 3 (100%) ========== */}
      {showThirdModal && (
        <div className="modal-overlay">
          <div className="modal-box big-modal">
            <h2 className="modal-title">Importante</h2>
            <p className="message-vis">
              Si es <strong>VIS</strong>, recuerda hacerlo en salarios mínimos del año de entrega.
            </p>

            <button className="modal-btn" onClick={closeThirdModal}>
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* PANTALLA PRINCIPAL */}
      <h1 className="title-hagamos">¡Hagamos cuentas!</h1>

      <div className="block-100" onClick={openModal100}>
        100% del Valor total del inmueble
      </div>

      <div className="line-divider"></div>

      <div className="percent-section">

        <div className="percent-box" onClick={openModal30}>
          <p>Cuota inicial</p>
          <div className="percent-value">30%</div>
        </div>

        <div className="percent-box" onClick={openModal70}>
          <p>Crédito hipotecario</p>
          <div className="percent-value">70%</div>
        </div>

      </div>

      <button className="back-btn" onClick={prev}>
        Volver
      </button>
      <button
    className="calculator-btn"
    onClick={goToEstimador}
  >
    Calculadora
  </button>
    </div>
  );
}
