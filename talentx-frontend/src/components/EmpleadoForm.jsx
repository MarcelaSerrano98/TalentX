import React, { useEffect, useState } from "react";
import {
  crearEmpleado,
  actualizarEmpleado,
  getEmpleadoById,
} from "../services/EmpleadoService";
import { getDepartamentos } from "../services/DepartamentoService";
import { getCargos } from "../services/CargoService";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EmpleadoForm = () => {
  const [empleado, setEmpleado] = useState({
    nombre: "",
    correo: "",
    salario: "",
    departamento: null,
    cargo: null,
  });

  const [departamentos, setDepartamentos] = useState([]);
  const [cargos, setCargos] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = parseInt(value);

    if (name === "departamento") {
      setEmpleado({ ...empleado, departamento: { id: parsedValue } });
    } else if (name === "cargo") {
      setEmpleado({ ...empleado, cargo: { id: parsedValue } });
    } else {
      setEmpleado({ ...empleado, [name]: value });
    }
  };

  const cargarEmpleado = async () => {
    if (id) {
      const res = await getEmpleadoById(id);
      setEmpleado(res.data);
    }
  };

  const cargarDepartamentos = async () => {
    const res = await getDepartamentos();
    setDepartamentos(res.data);
  };

  const cargarCargos = async () => {
    const res = await getCargos();
    setCargos(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await actualizarEmpleado(empleado);
      Swal.fire("¡Actualizado!", "Empleado actualizado con éxito.", "success");
    } else {
      await crearEmpleado(empleado);
      Swal.fire("¡Guardado!", "Empleado creado con éxito.", "success");
    }
    navigate("/empleados");
  };

  useEffect(() => {
    cargarDepartamentos();
    cargarCargos();
    cargarEmpleado();
  }, []);

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow w-100" style={{ maxWidth: "600px" }}>
        <h3 className="text-center mb-4 text-primary">
          {id ? "Editar Empleado" : "Nuevo Empleado"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              placeholder="Nombre"
              value={empleado.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input
              type="email"
              name="correo"
              className="form-control"
              placeholder="Correo"
              value={empleado.correo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Salario</label>
            <input
              type="number"
              name="salario"
              className="form-control"
              placeholder="Salario"
              value={empleado.salario}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Departamento</label>
            <select
              name="departamento"
              className="form-select"
              value={empleado.departamento?.id || ""}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un Departamento</option>
              {departamentos.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="form-label">Cargo</label>
            <select
              name="cargo"
              className="form-select"
              value={empleado.cargo?.id || ""}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un Cargo</option>
              {cargos.map((cargo) => (
                <option key={cargo.id} value={cargo.id}>
                  {cargo.nombre}
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

export default EmpleadoForm;
