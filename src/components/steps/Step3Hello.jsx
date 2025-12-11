import React, { useEffect, useState } from "react";
import "./Step3Hello.css";
import personaje9 from '/src/assets/Personajes/Personaje 9.png';


export default function Step3Hello({ data, next }) {

  const [name, setName] = useState("USUARIO");
  const [photo, setPhoto] = useState(null);

  // Función para reducir el nombre (primer nombre + primer apellido)
  const shortenName = (fullName) => {
    if (!fullName) return "USUARIO";
    const parts = fullName.split(" ").filter(p => p.trim() !== "");
    return parts.slice(0, 2).join(" ").toUpperCase();
  };

  useEffect(() => {

    const fetchNameFromAloha = async () => {
      try {
        const response = await fetch(
          `https://apialoha.crepesywaffles.com/intellinext2?dui_person=${data.document}`
        );

        const raw = await response.json();
        console.log("📨 API ALOHA:", raw);

        if (Array.isArray(raw) && raw.length > 0) {
          const fullName =
            raw[0].full_name ||
            raw[0].NOMBRE ||
            "USUARIO";

          setName(shortenName(fullName));
        }
      } catch (error) {
        console.error("❌ Error API Aloha:", error);
      }
    };


    const fetchEmployeeFromBUK = async () => {
      try {
        const response = await fetch(
          `https://crepesywaffles.buk.co/api/v1/colombia/employees?page_size=500&document_number=${data.document}`,
          {
            headers: {
              Accept: "application/json",
              auth_token: "tmMC1o7cUovQvWoKhvbdhYxx",
            },
          }
        );

        const buk = await response.json();
        console.log("📸 API BUK:", buk);

        if (buk?.data?.length > 0) {
          const empleado = buk.data[0];

          if (empleado.full_name) {
            setName(shortenName(empleado.full_name));
          }

          if (empleado.picture_url) {
            setPhoto(empleado.picture_url);
          }
        } else {
          console.warn("⚠ No se encontró el empleado en BUK.");
        }

      } catch (error) {
        console.error("❌ Error API BUK:", error);
      }
    };

    fetchNameFromAloha();
    fetchEmployeeFromBUK();

  }, [data.document]);


  return (
    <div className="step3-container">
      <div className="step3-content">

        {/* FOTO DEL EMPLEADO */}
        <div className="step3-photo-wrapper">
          <img
            src={
              photo ||
              personaje9
            }
            alt="Foto empleado"
            className="step3-photo"
          />
        </div>

        <h1 className="step3-title">¡HOLA, {name}!</h1>

        <p className="step3-message">
          Tu sueño de tener vivienda está más cerca de ser una realidad.
          <br />
          Te invitamos a compartir tu información para que seas de los primeros en abrir la puerta a esta nueva oportunidad.
          <br />
          <strong>
            Prepárate… vienen sorpresas que podrán convertirse en la semilla de tu próximo hogar.
          </strong>
        </p>

        <div className="step3-button-wrapper">
          <button onClick={next} className="step3-button">
            Empecemos
          </button>
        </div>
      </div>
    </div>
  );
}
