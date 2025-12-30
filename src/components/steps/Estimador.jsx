import React, { useState, useEffect } from "react";
import "./Estimador.css";

export default function Estimador({ onBack }) {
  // ======================
  // ESTADOS
  // ======================
  const [income, setIncome] = useState(3000000);
  const [savings, setSavings] = useState(0);
  const [term, setTerm] = useState(20);
  const [interestRate, setInterestRate] = useState(12); // % anual

  const [monthlyQuota, setMonthlyQuota] = useState(0);
  const [housePrice, setHousePrice] = useState(0);
  const [status, setStatus] = useState("ok");

  const formatCOP = (value) =>
    value.toLocaleString("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  const parseNumber = (value) => Number(value.replace(/\./g, "")) || 0;

  // ======================
  // CÁLCULOS
  // ======================
  useEffect(() => {
    if (income <= 0) return;

    const maxQuota30 = income * 0.3;
    const maxQuota40 = income * 0.4;

    const monthlyRate = interestRate / 100 / 12;
    const months = term * 12;

    // Crédito máximo según cuota del 30%
    const creditValue =
      (maxQuota30 * (Math.pow(1 + monthlyRate, months) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, months));

    const estimatedHousePrice = creditValue + savings;

    setMonthlyQuota(Math.round(maxQuota30));
    setHousePrice(Math.round(estimatedHousePrice));

    // Semáforo
    if (maxQuota30 <= income * 0.3) setStatus("ok");
    else if (maxQuota30 <= maxQuota40) setStatus("warning");
    else setStatus("danger");
  }, [income, savings, term, interestRate]);

  const statusLabel = {
    ok: "🟢 Cuota saludable",
    warning: "🟡 Cuota ajustada",
    danger: "🔴 Cuota riesgosa",
  };

  return (
    <div className="estimador-page">
      <div className="estimador-card">
        <h2>Calculadora de presupuesto</h2>
        <p className="estimador-subtitle">
          Estimación aproximada basada en buenas prácticas financieras.
          <strong> No se guarda información.</strong>
        </p>

        {/* INGRESO */}
        <div className="estimador-field">
          <label>Ingreso mensual del hogar</label>
          <input
            type="text"
            inputMode="numeric"
            value={formatCOP(income)}
            onChange={(e) => setIncome(parseNumber(e.target.value))}
          />
        </div>

        {/* AHORROS */}
        <div className="estimador-field">
          <label>Ahorros (cuota inicial)</label>
          <input
            type="text"
            min="0"
            value={formatCOP(savings)}
            onChange={(e) => setSavings(parseNumber(e.target.value))}
          />
        </div>

        {/* PLAZO */}
        <div className="estimador-field">
          <label>Plazo del crédito (años)</label>
          <input
            type="range"
            min="10"
            max="30"
            step="5"
            value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
          />
          <span>{term} años</span>
        </div>

        {/* TASA */}
        <div className="estimador-field">
          <label>Tasa de interés anual (%)</label>
          <input
            type="range"
            min="9"
            max="16"
            step="0.5"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
          <span>{interestRate}%</span>
        </div>

        {/* RESULTADOS */}
        <div className="estimador-results">
          <div className="result-item">
            <span>Cuota mensual recomendada (30%)</span>
            <strong>${formatCOP(monthlyQuota)}</strong>
          </div>

          <div className="result-item">
            <span>Precio estimado de vivienda</span>
            <strong>${formatCOP(housePrice)}</strong>
          </div>

          <div className="result-item">
            <span>Evaluación</span>
            <strong>{statusLabel[status]}</strong>
          </div>
        </div>

        {/* ACCIÓN */}
        <div className="estimador-actions">
          <button className="btn-ghost" onClick={onBack}>
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
