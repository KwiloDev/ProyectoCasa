import React, { useEffect, useState } from "react";
import "./AdminHous.css";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export default function AdminPanel() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState("");
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

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

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Reporte");

    const headers = [
  "ID",
  "Documento",
  "Nombre",
  "Tiene Vivienda",
  "Meta Vivienda",
  "Tipo Vivienda",
  "Afiliado a Caja",
  "Ingresos < 4 SMLMV",
  "Núcleo Familiar",
  "Todos Afiliados",
  "Es Propietario",
  "Subsidio Anterior",
  "Respuesta Usuario",
  "Fecha Registro",
];


    // 🎨 COLORES PASTEL POR COLUMNA
    const columnColors = [
  "FDEDEC", // ID
  "EBF5FB", // Documento
  "E9F7EF", // Nombre
  "FEF9E7", // Tiene Vivienda
  "F5EEF8", // Meta
  "FDEBD0", // Tipo Vivienda
  "E8F8F5", // Afiliado Caja
  "FDF2E9", // Ingresos
  "EBDEF0", // Núcleo
  "FADBD8", // Todos afiliados
  "EAEDED", // Propietario
  "FCF3CF", // Subsidio
  "E8F6F3", // Respuesta
  "FDF2E9", // Fecha
];


    // 🟥 Encabezados fuertes
 const headerColors = [
  "7B241C", // ID
  "1F618D", // Documento
  "196F3D", // Nombre
  "9A7D0A", // Tiene Vivienda
  "6C3483", // Meta
  "AF601A", // Tipo
  "117A65", // Afiliado
  "935116", // Ingresos
  "1A5276", // Núcleo
  "943126", // Todos
  "616A6B", // Propietario
  "7D6608", // Subsidio
  "148F77", // Respuesta
  "AF601A", // Fecha
];



    // 🏷️ TÍTULO
    sheet.mergeCells(1, 1, 1, headers.length);
    const titleCell = sheet.getCell("A1");
    titleCell.value = "Reporte General – Viviendas Crepes & Waffles";
    titleCell.font = { bold: true, size: 22, color: { argb: "1A5276" } };
    titleCell.alignment = { horizontal: "center" };

    // SUBTÍTULO
    sheet.mergeCells(2, 1, 2, headers.length);
    const sub = sheet.getCell("A2");
    sub.value = "Exportado automáticamente";
    sub.font = { italic: true, size: 12, color: { argb: "5D6D7E" } };
    sub.alignment = { horizontal: "center" };

    // ENCABEZADOS (fila 4)
    sheet.addRow(headers);

    headers.forEach((h, i) => {
      const cell = sheet.getCell(4, i + 1);
      cell.font = { bold: true, size: 14, color: { argb: "FFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: headerColors[i] },
      };
      cell.alignment = { horizontal: "center" };
      cell.border = {
        top: { style: "medium" },
        left: { style: "medium" },
        bottom: { style: "medium" },
        right: { style: "medium" },
      };
    });

    // CUERPO DE TABLA
    const excelData = data.map((item) => {
      const r = item.attributes.res_v || {};
      const doc = item.attributes.documento;

      const info = employeeInfo[doc] || {};

      return [
  item.id,
  doc,
  info.nombre || "No encontrado",
  r.hasHome || "—",
  r.homeGoal || "—",
  r.typeOfHousing || "—",
  r.affiliatedToCaja || "—",
  r.incomesUnder4SM || "—",
  r.householdNucleus || "—",
  r.allAffiliated || "—",
  r.houseOwner || "—",
  r.hadSubsidyBefore || "—",
  r.userResponse || "—",
  new Date(item.attributes.createdAt).toLocaleDateString(),
];

    });

    excelData.forEach((row, rowIndex) => {
      const excelRow = sheet.addRow(row);

      row.forEach((value, colIndex) => {
        const cell = excelRow.getCell(colIndex + 1);

        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: columnColors[colIndex] },
        };

        cell.alignment = { wrapText: true };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };

        // 💡 Resaltar "SI" verde, "NO" rojo
        if (colIndex === 3) {
          if (String(value).toUpperCase().includes("SI")) {
            cell.fill.fgColor.argb = "ABEBC6";
          }
          if (String(value).toUpperCase().includes("NO")) {
            cell.fill.fgColor.argb = "F5B7B1";
          }
        }
      });
    });

    // Ancho de columnas
    sheet.columns = headers.map(() => ({ width: 25 }));

    // Fila congelada
    sheet.views = [{ state: "frozen", ySplit: 4 }];

    // Generar archivo
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "reporte_viviendas.xlsx");
  };


  //Controlador de inicio sesion____________*****************_____________________________////////////////////////
  const handleLogin = () => {
    if (password === REAL_PASSWORD) {
      setShowSuccessModal(true);
    } else {
      const box = document.querySelector(".guardian-box");
      if (box) {
        box.classList.add("shake");
        setTimeout(() => box.classList.remove("shake"), 600);
      }
    }
  };

  // 🔐 SI NO ESTÁ AUTORIZADO
  if (!authorized) {
    return (
      <div className="admin-container guardian-wrapper">
        {showSuccessModal && (
          <div className="success-modal-overlay">
            <div className="success-modal">
              <div className="waffle-guardian big">🧇</div>
              <h2 className="success-title">Acceso Concedido</h2>
              <p className="success-text">
                El Waffle Guardián inclina su corona dorada. Puedes pasar,
                caminante de datos.
              </p>

              <button className="btn-enter" onClick={() => setAuthorized(true)}>
                Entrar al Panel
              </button>
            </div>
          </div>
        )}

        <div className="guardian-box">
          <div className="waffle-guardian">🧇</div>

          <h1 className="admin-title">Acceso Restringido</h1>

          <p className="guardian-text">
            El Waffle Guardián te mira con ojos de masa tibia. Solo la clave
            secreta abre su gruta dorada.
          </p>

          <input
            type="password"
            placeholder="Contraseña..."
            className="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLogin();
            }}
          />

          <button className="btn-enter" onClick={handleLogin}>
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
      <div className="admin-header-grid">
        <button className="btn-back" onClick={goBack}>
          ⬅ Regresar
        </button>

        <h1 className="admin-title">Panel Administrativo</h1>

        <button className="btn-excel" onClick={exportToExcel}>
          📊 Exportar a Excel
        </button>
      </div>
      {loading ? (
        <p className="admin-loading">Cargando registros...</p>
      ) : (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Documento</th>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Estado Vivienda</th>
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
                    <td>{info.nombre || "Cargando..."}</td>
                    <td>
                      <button
                        className="ver-mas-btn"
                        onClick={() => {
                          setSelectedQuiz(r);
                          setShowQuizModal(true);
                        }}
                      >
                        Ver
                      </button>
                    </td>

                    <td>
                      <div className="response-preview">{fullResponse}</div>

                      {fullResponse.length > 70 && (
                        <button
                          className="ver-mas-btn"
                          onClick={() => {
                            setSelectedResponse(fullResponse);
                            setShowResponseModal(true);
                          }}
                        >
                          … ver más
                        </button>
                      )}
                    </td>

                    <td>
                      {new Date(item.attributes.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {showResponseModal && (
            <div
              className="modal-overlay"
              onClick={() => setShowResponseModal(false)}
            >
              <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title-adm">Respuesta del Usuario</h2>

                <p className="modal-content">{selectedResponse}</p>

                <button
                  className="modal-close"
                  onClick={() => setShowResponseModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
          {showQuizModal && selectedQuiz && (
            <div
              className="modal-overlay"
              onClick={() => setShowQuizModal(false)}
            >
              <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title-adm">Cuestionario de Vivienda</h2>

                <div className="quiz-list">
                  <p>
                    <strong>Tiene vivienda:</strong>{" "}
                    {selectedQuiz.hasHome || "—"}
                  </p>
                  <p>
                    <strong>Meta de vivienda:</strong>{" "}
                    {selectedQuiz.homeGoal || "—"}
                  </p>
                  <p>
                    <strong>Tipo de vivienda:</strong>{" "}
                    {selectedQuiz.typeOfHousing || "—"}
                  </p>
                  <p>
                    <strong>Afiliado a Caja:</strong>{" "}
                    {selectedQuiz.affiliatedToCaja || "—"}
                  </p>
                  <p>
                    <strong>Ingresos menores a 4 SMLMV:</strong>{" "}
                    {selectedQuiz.incomesUnder4SM || "—"}
                  </p>
                  <p>
                    <strong>Núcleo familiar:</strong>{" "}
                    {selectedQuiz.householdNucleus || "—"}
                  </p>
                  <p>
                    <strong>Todos afiliados:</strong>{" "}
                    {selectedQuiz.allAffiliated || "—"}
                  </p>
                  <p>
                    <strong>Es propietario:</strong>{" "}
                    {selectedQuiz.houseOwner || "—"}
                  </p>
                  <p>
                    <strong>Subsidio anterior:</strong>{" "}
                    {selectedQuiz.hadSubsidyBefore || "—"}
                  </p>
                </div>

                <button
                  className="modal-close"
                  onClick={() => setShowQuizModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
