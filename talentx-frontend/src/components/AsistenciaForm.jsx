import React, { useEffect, useState } from "react";
import {
  crearAsistencia,
  actualizarAsistencia,
  getAsistenciaById,
} from "../services/AsistenciaService";
import { getEmpleados } from "../services/EmpleadoService";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const AsistenciaForm = () => {
  const [empleados, setEmpleados] = useState([]);
  const [asistencia, setAsistencia] = useState({
    fecha: "",
    estado: "",
    observaciones: "",
    empleado: null,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const cargarEmpleados = async () => {
    const res = await getEmpleados();
    setEmpleados(res.data);
  };

  const cargarAsistencia = async () => {
    if (id) {
      const res = await getAsistenciaById(id);
      setAsistencia(res.data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "empleado") {
      setAsistencia({ ...asistencia, empleado: { id: value } });
    } else {
      setAsistencia({ ...asistencia, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await actualizarAsistencia(asistencia);
      Swal.fire("Actualizado", "", "success");
    } else {
      await crearAsistencia(asistencia);
      Swal.fire("Registrado", "", "success");
    }
    navigate("/asistencias");
  };

  useEffect(() => {
    cargarEmpleados();
    cargarAsistencia();
  }, []);

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow w-100" style={{ maxWidth: "600px" }}>
        <h3 className="text-center mb-4 text-primary">
          {id ? "Editar Asistencia" : "Registrar Asistencia"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Fecha</label>
            <input
              type="date"
              name="fecha"
              className="form-control"
              value={asistencia.fecha}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Estado</label>
            <select
              name="estado"
              className="form-select"
              value={asistencia.estado}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione estado</option>
              <option value="Asistió">Asistió</option>
              <option value="Inasistencia">Inasistencia</option>
              <option value="Retardo">Retardo</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Observaciones</label>
            <textarea
              name="observaciones"
              className="form-control"
              placeholder="Observaciones"
              value={asistencia.observaciones}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Empleado</label>
            <select
              name="empleado"
              className="form-select"
              value={asistencia.empleado?.id || ""}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un Empleado</option>
              {empleados.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary w-50 me-2">Guardar</button>
            <button
              type="button"
              className="btn btn-outline-danger w-50"
              onClick={() => window.history.back()}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AsistenciaForm;
