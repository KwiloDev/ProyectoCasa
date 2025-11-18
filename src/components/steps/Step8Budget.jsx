import React from 'react';
import './Step8Budget.css';
// Si tu ilustración es un componente de React, impórtalo aquí
// import WomanIllustration from './WomanIllustration'; 

// Define los colores basados en la imagen para el estilo inline si es necesario
const COLORS = {
  text: '#503629',
  cardBgLight: '#f0c377', // Mostaza claro para la primera opción
  cardBgDark: '#503629',  // Marrón oscuro para la segunda opción
  cardBgOrange: '#e5a44a', // Naranja/Mostaza para la tercera y botones
  cardTextLight: '#503629',
  cardTextDark: '#ffffff',
  accent: '#e5a44a',
}

export default function Step8Budget({ data, update, next, nextbudget2, prev }){
  const choose = (val) => { update({ budgetChoice: val }); next() }

  return (
    <div className="step8-budget-page"> {/* Cambiado a page para un mejor control del layout */}
      <div className="main-content-wrapper"> {/* Nuevo wrapper para contenido principal */}
        {/* Contenedor para la ilustración de la señora */}
        <div className="woman-illustration-container">
            {/* Aquí es donde "llamas" a tu ilustración */}
            {/* OPCIÓN 1: Si es un componente de React */}
            {/* <WomanIllustration /> */}

            {/* OPCIÓN 2: Si es una imagen estática */}
            <img src=" /src/assets/Personajes/Personaje 5.png" alt="Ilustración de señora" className="woman-illustration" />
        </div>

        <div className="step8-budget-container"> {/* El contenedor de las opciones */}
            {/* Burbuja de diálogo replicada */}
            <div className="speech-bubble-wrapper">
                <div className="speech-bubble">
                    Ahora que ya sabes el tipo de vivienda que más se adapta a ti, veamos cuál es tu **presupuesto**. 
                    Esto dependerá de tus **ingresos** y de los **préstamos o créditos** que puedas solicitar
                </div>
            </div>

            <div className="options-grid">
                {/* Opción 1: Tienes el dinero completo */}
                <div className="option-card option-card-light" onClick={()=>choose('completo')}>
                    <h4 className="card-title" style={{color: COLORS.text}}>Tienes el dinero completo para tu vivienda</h4>
                    <p className="card-subtitle">¡Ahora elige tu vivienda!</p>
                    <div className="action-button-wrapper">
                        <button className="card-button card-button-light">Haciendo Click Aquí</button>
                    </div>
                </div>
                
                {/* Opción 2: No tienes claro tu presupuesto */}
                <div className="option-card option-card-dark" onClick={()=>choose('estimar')}>
                    <h4 className="card-title" style={{color: COLORS.cardTextDark}}>¿No tienes claro tu presupuesto?</h4>
                    <p className="card-subtitle" style={{color: COLORS.cardTextDark}}>Obtén un estimado de gastos, cuotas o presupuestos.</p>
                    <div className="action-button-wrapper">
                        <button className="card-button card-button-dark">Haciendo Click Aquí</button>
                    </div>
                </div>

                {/* Opción 3: Estás reportado en centrales */}
                <div className="option-card option-card-orange" onClick={()=>choose('reportado')}>
                    <h4 className="card-title" style={{color: COLORS.text}}>¿Estás reportado en centrales?</h4>
                    <p className="card-subtitle">¡Tu sueño no termina aquí! Inicia tu proceso de subsanamiento</p>
                    <div className="action-button-wrapper">
                        <button className="card-button card-button-orange">Haciendo Click Aquí</button>
                    </div>
                </div>
            </div>
            
            {/* Bloque de botones inferiores */}
            <div className="bottom-actions">
                <button onClick={prev} className="button-volver">Volver</button>
                <div className="button-continuar-wrapper" onClick={nextbudget2}>
                    <span className="button-continuar-text">¿Ya tienes todo claro? ¡Continuemos!</span>
                    <span className="hand-icon"></span> {/* Placeholder para el icono de la mano */}
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}