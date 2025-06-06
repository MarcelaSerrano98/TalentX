import React, { useEffect, useState } from "react";
import { getAsistencias, eliminarAsistencia } from "../services/AsistenciaService";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AsistenciaList = () => {
  const [asistencias, setAsistencias] = useState([]);

  const cargarAsistencias = async () => {
    const res = await getAsistencias();
    setAsistencias(res.data);
  };

  const handleEliminar = async (id) => {
    Swal.fire({
      title: "¿Eliminar asistencia?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminarAsistencia(id);
        cargarAsistencias();
        Swal.fire("Eliminado", "", "success");
      }
    });
  };

  useEffect(() => {
    cargarAsistencias();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary">Registro de Asistencias</h2>
        <Link to="/crear-asistencia" className="btn btn-success btn-sm">
          + Registrar Asistencia
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Empleado</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Observaciones</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {asistencias.map((a) => (
              <tr key={a.id}>
                <td>{a.empleado?.nombre}</td>
                <td>{a.fecha}</td>
                <td>{a.estado}</td>
                <td>{a.observaciones}</td>
                <td>
                  <div className="btn-group">
                    <Link to={`/editar-asistencia/${a.id}`} className="btn btn-warning btn-sm">
                      Editar
                    </Link>
                    <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(a.id)}>
                      Eliminar
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

export default AsistenciaList;
