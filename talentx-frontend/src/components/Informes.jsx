import React, { useState } from "react";
import axios from "axios";

const Informes = () => {
  const [informeSeleccionado, setInformeSeleccionado] = useState("");

  const descargarInforme = () => {
    if (!informeSeleccionado) {
      alert("Selecciona un informe primero");
      return;
    }

    axios
      .get(`http://localhost:8080/api/informes/${informeSeleccionado}`, {
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${informeSeleccionado}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.error("Error al descargar el informe:", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center text-primary">Descargar Informes</h2>
        <div className="mb-3">
          <label htmlFor="informeSelect" className="form-label fw-bold">
            Selecciona un informe
          </label>
          <select
            id="informeSelect"
            className="form-select"
            value={informeSeleccionado}
            onChange={(e) => setInformeSeleccionado(e.target.value)}
          >
            <option value="">-- Selecciona --</option>
            <option value="empleados">Informe de Empleados</option>
            <option value="departamentos">Informe de Departamentos</option>
            <option value="nomina">Informe de Nómina</option>
          </select>
        </div>
        <div className="d-grid">
          <button
            className="btn btn-success"
            onClick={descargarInforme}
          >
            <i className="bi bi-download me-2"></i>
            Descargar Informe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Informes;
