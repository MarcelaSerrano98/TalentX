import React, { useState, useEffect } from "react";
import {
  crearDepartamento,
  actualizarDepartamento,
  getDepartamentoById,
} from "../services/DepartamentoService";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const DepartamentoForm = () => {
  const [nombre, setNombre] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const cargar = async () => {
    if (id) {
      const res = await getDepartamentoById(id);
      setNombre(res.data.nombre);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dto = { id, nombre };
    if (id) {
      await actualizarDepartamento(dto);
      Swal.fire("¡Actualizado!", "", "success");
    } else {
      await crearDepartamento(dto);
      Swal.fire("¡Creado!", "", "success");
    }
    navigate("/departamentos");
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow w-100" style={{ maxWidth: "500px" }}>
        <h3 className="text-center mb-4 text-primary">
          {id ? "Editar Departamento" : "Nuevo Departamento"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label">Nombre del departamento</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre del departamento"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
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

export default DepartamentoForm;
