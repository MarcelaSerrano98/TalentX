import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmpleados } from "../services/EmpleadoService";
import {
  crearNomina,
  actualizarNomina,
  getNominaById,
} from "../services/NominaService";
import Swal from "sweetalert2";

const NominaForm = () => {
  const [empleados, setEmpleados] = useState([]);
  const [nomina, setNomina] = useState({
    mes: "",
    horasTrabajadas: "",
    horasExtras: "",
    horasNocturnas: "",
    bonificaciones: "",
    empleado: null,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const cargarEmpleados = async () => {
    const res = await getEmpleados();
    setEmpleados(res.data);
  };

  const cargarNomina = async () => {
    if (id) {
      const res = await getNominaById(id);
      const data = res.data;
      setNomina({
        mes: data.mes?.substring(0, 7),
        horasTrabajadas: data.horasTrabajadas || "",
        horasExtras: data.horasExtras || "",
        horasNocturnas: data.horasNocturnas || "",
        bonificaciones: data.bonificaciones || "",
        empleado: data.empleado?.id || null,
      });
    }
  };

  useEffect(() => {
    cargarEmpleados();
    cargarNomina();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "empleado") {
      setNomina({ ...nomina, empleado: Number(value) });
    } else {
      setNomina({ ...nomina, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dto = {
      mes: `${nomina.mes}-01`,
      horasTrabajadas: Number(nomina.horasTrabajadas),
      horasExtras: Number(nomina.horasExtras),
      horasNocturnas: Number(nomina.horasNocturnas),
      bonificaciones: Number(nomina.bonificaciones),
      empleado: { id: nomina.empleado },
    };

    try {
      if (id) {
        await actualizarNomina({ id: Number(id), ...dto });
        Swal.fire("Actualizado", "Registro de nómina actualizado", "success");
      } else {
        await crearNomina(dto);
        Swal.fire("Creado", "Nómina registrada", "success");
      }
      navigate("/nomina");
    } catch (error) {
      Swal.fire("Error", "No se pudo guardar la nómina", "error");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow w-100" style={{ maxWidth: "600px" }}>
        <h3 className="text-center mb-4 text-primary">
          {id ? "Editar Nómina" : "Registrar Nómina"}
        </h3>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Mes", name: "mes", type: "month" },
            { label: "Horas Trabajadas", name: "horasTrabajadas", type: "number" },
            { label: "Horas Extras", name: "horasExtras", type: "number" },
            { label: "Horas Nocturnas", name: "horasNocturnas", type: "number" },
            { label: "Bonificaciones", name: "bonificaciones", type: "number", step: "0.01" },
          ].map(({ label, name, type, step }) => (
            <div className="mb-3" key={name}>
              <label className="form-label">{label}</label>
              <input
                type={type}
                step={step}
                name={name}
                className="form-control"
                value={nomina[name]}
                onChange={handleChange}
                min="0"
                required={name !== "horasExtras" && name !== "horasNocturnas"}
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="form-label">Empleado</label>
            <select
              name="empleado"
              className="form-select"
              value={nomina.empleado || ""}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un empleado</option>
              {empleados.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary w-50 me-2">
              {id ? "Actualizar" : "Generar Nómina"}
            </button>
            <button
              type="button"
              className="btn btn-outline-danger w-50"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NominaForm;
