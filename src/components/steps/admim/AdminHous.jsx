import React, { useEffect, useState } from "react";
import "./AdminHous.css";

export default function AdminPanel() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // 📌 NUEVO: nombres y fotos desde BUK
  const [employeeInfo, setEmployeeInfo] = useState({});

  const REAL_PASSWORD = "Crepes2025";

  // =====================================================================
  // 📌 Cargar datos desde STRAPI
  // =====================================================================
  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://macfer.crepesywaffles.com/api/cvivienas111-del-futuros?populate=*"
      );
      const json = await res.json();

      setData(json.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Error cargando datos:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authorized) fetchData();
  }, [authorized]);

  // =====================================================================
  // 📌 Consultar NOMBRE + FOTO desde BUK según documento
  // =====================================================================
  const fetchEmployeeFromBUK = async (documento) => {
    try {
      const response = await fetch(
        `https://crepesywaffles.buk.co/api/v1/colombia/employees?page_size=500&document_number=${documento}`,
        {
          headers: {
            Accept: "application/json",
            auth_token: "tmMC1o7cUovQvWoKhvbdhYxx",
          },
        }
      );

      const buk = await response.json();
      console.log("📌 BUK en panel admin:", buk);

      if (buk?.data?.length > 0) {
        const empleado = buk.data[0];

        setEmployeeInfo((prev) => ({
          ...prev,
          [documento]: {
            nombre: empleado.full_name || "Sin nombre",
            foto: empleado.picture_url || null,
          },
        }));
      } else {
        setEmployeeInfo((prev) => ({
          ...prev,
          [documento]: { nombre: "No encontrado", foto: null },
        }));
      }
    } catch (error) {
      console.error("❌ Error consultando BUK:", error);
    }
  };

  // Consultar BUK cuando lleguen datos del servidor
  useEffect(() => {
    data.forEach((item) => {
      const doc = item.attributes.documento;
      if (!employeeInfo[doc]) {
        fetchEmployeeFromBUK(doc);
      }
    });
  }, [data]);

  const goBack = () => {
    window.location.href = "/";
  };

  // =====================================================================
  // 🔐 Pantalla de contraseña
  // =====================================================================
  if (!authorized) {
    return (
      <div className="admin-container guardian-wrapper">
        {showSuccessModal && (
          <div className="success-modal-overlay">
            <div className="success-modal">
              <div className="waffle-guardian big">🧇</div>
              <h2 className="success-title">Acceso Concedido</h2>
              <p className="success-text">
                El Waffle Guardián se inclina ante ti.
              </p>

              <button className="btn-enter" onClick={() => setAuthorized(true)}>
                Continuar al Panel
              </button>
            </div>
          </div>
        )}

        <div className="guardian-box">
          <div className="waffle-guardian">🧇</div>

          <h1 className="admin-title">Acceso Restringido</h1>

          <p className="guardian-text">
            El Waffle Guardián te vigila…  
            Solo la clave verdadera abre sus puertas.
          </p>

          <input
            type="password"
            placeholder="Contraseña secreta..."
            className="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="btn-enter"
            onClick={() => {
              if (password === REAL_PASSWORD) {
                setShowSuccessModal(true);
              } else {
                const box = document.querySelector(".guardian-box");
                if (box) {
                  box.classList.add("shake");
                  setTimeout(() => box.classList.remove("shake"), 600);
                }
              }
            }}
          >
            Entrar
          </button>

          <button className="btn-back" onClick={goBack}>
            ⬅ Regresar
          </button>
        </div>
      </div>
    );
  }

  // =====================================================================
  // 📊 PANEL ADMINISTRATIVO
  // =====================================================================
  return (
    <div className="admin-container">
      <button className="btn-back" onClick={goBack}>
        ⬅ Regresar
      </button>

      <h1 className="admin-title">Panel Administrativo</h1>

      {loading ? (
        <p className="admin-loading">Cargando registros...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Documento</th>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Estado Vivienda</th>
              <th>Meta</th>
              <th>Tipo Vivienda</th>
              <th>Respuesta Usuario</th>
              <th>Fecha Registro</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => {
              const r = item.attributes.res_v || {};
              const doc = item.attributes.documento;

              const info = employeeInfo[doc] || {};
              const fullResponse = r.userResponse || "—";
              const homeGoal = r.homeGoal || "—";

              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{doc}</td>
                  <td>
                    {info.foto ? (
                      <img
                        src={info.foto}
                        alt="Foto"
                        style={{
                          width: 45,
                          height: 45,
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      "—"
                    )}
                  </td>

                  {/* Nombre desde BUK */}
                  <td>{info.nombre || "Cargando..."}</td>

                  {/* Foto profesional desde BUK */}
                  

                  {/* CAMPOS ORIGINALES — NO CAMBIADOS */}
                  <td>{r.hasHome }</td>
                  <td>{homeGoal}</td>
                  <td>{r.typeOfHousing }</td>
                  <td>{fullResponse}</td>

                  <td>
                    {new Date(item.attributes.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
