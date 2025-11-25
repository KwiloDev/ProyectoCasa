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
    "Estado_Vivienda",
    "Meta",
    "Tipo_Vivienda",
    "Respuesta_Usuario",
    "Fecha",
  ];

  // 🎨 COLORES PASTEL POR COLUMNA
  const columnColors = [
    "FDEDEC",
    "EBF5FB",
    "E9F7EF",
    "FEF9E7",
    "F5EEF8",
    "FDEBD0",
    "E8F8F5",
    "FDF2E9"
  ];

  // 🟥 Encabezados fuertes
  const headerColors = [
    "C0392B",
    "2471A3",
    "1E8449",
    "B7950B",
    "6C3483",
    "CA6F1E",
    "148F77",
    "AF601A"
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
    info.nombre || "No encontrado",       // ✅ Nombre desde BUK
    r.hasHome || "—",
    r.homeGoal || "—",
    r.typeOfHousing || "—",
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
                El Waffle Guardián inclina su corona dorada.  
                Puedes pasar, caminante de datos.
              </p>

              <button
                className="btn-enter"
                onClick={() => setAuthorized(true)}
              >
                Entrar al Panel
              </button>
            </div>
          </div>
        )}

          <div className="guardian-box">
            <div className="waffle-guardian">🧇</div>

            <h1 className="admin-title">Acceso Restringido</h1>

          <p className="guardian-text">
            El Waffle Guardián te mira con ojos de masa tibia.  
            Solo la clave secreta abre su gruta dorada.
          </p>

          <input
            type="password"
            placeholder="Contraseña..."
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

      <button className="btn-excel" onClick={exportToExcel}>
        📊 Exportar a Excel
      </button>

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
