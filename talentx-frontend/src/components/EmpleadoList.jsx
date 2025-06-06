import React, { useEffect, useState } from "react";
import { getEmpleados, eliminarEmpleado } from "../services/EmpleadoService";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const EmpleadoList = () => {
  const [empleados, setEmpleados] = useState([]);

  const cargarEmpleados = async () => {
    const res = await getEmpleados();
    setEmpleados(res.data);
  };

  const handleEliminar = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminarEmpleado(id);
        cargarEmpleados();
        Swal.fire("¡Eliminado!", "Empleado eliminado con éxito.", "success");
      }
    });
  };

  useEffect(() => {
    cargarEmpleados();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary">Lista de Empleados</h2>
        <Link to="/crear-empleado" className="btn btn-success btn-sm">
          + Agregar Empleado
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Cargo</th>
              <th>Departamento</th>
              <th>Salario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((e) => (
              <tr key={e.id}>
                <td>{e.nombre}</td>
                <td>{e.correo}</td>
                <td>{e.cargo?.nombre}</td>
                <td>{e.departamento?.nombre || "Sin departamento"}</td>
                <td>${e.salario}</td>
                <td>
                  <div className="btn-group" role="group">
                    <Link
                      to={`/editar/${e.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={() => handleEliminar(e.id)}
                      className="btn btn-danger btn-sm"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmpleadoList;
