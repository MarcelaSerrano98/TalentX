import React, { useEffect, useState } from "react";
import {
  crearCargo,
  actualizarCargo,
  getCargoById,
} from "../services/CargoService";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const CargoForm = () => {
  const [cargo, setCargo] = useState({ nombre: "", descripcion: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCargo({ ...cargo, [e.target.name]: e.target.value });
  };

  const cargarCargo = async () => {
    if (id) {
      const res = await getCargoById(id);
      setCargo(res.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await actualizarCargo(cargo);
      Swal.fire("¡Actualizado!", "Cargo actualizado con éxito.", "success");
    } else {
      await crearCargo(cargo);
      Swal.fire("¡Guardado!", "Cargo creado con éxito.", "success");
    }
    navigate("/cargos");
  };

  useEffect(() => {
    cargarCargo();
  }, []);

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow w-100" style={{ maxWidth: "600px" }}>
        <h3 className="text-center mb-4 text-primary">
          {id ? "Editar Cargo" : "Nuevo Cargo"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre del Cargo</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={cargo.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Descripción</label>
            <textarea
              name="descripcion"
              className="form-control"
              value={cargo.descripcion}
              onChange={handleChange}
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

export default CargoForm;
