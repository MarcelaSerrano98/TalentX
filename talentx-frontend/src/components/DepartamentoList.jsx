import React, { useEffect, useState } from "react";
import { getDepartamentos, eliminarDepartamento } from "../services/DepartamentoService";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const DepartamentoList = () => {
  const [departamentos, setDepartamentos] = useState([]);

  const cargar = async () => {
    const res = await getDepartamentos();
    setDepartamentos(res.data);
  };

  const handleEliminar = async (id) => {
    Swal.fire({
      title: "¿Eliminar departamento?",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminarDepartamento(id);
        cargar();
        Swal.fire("¡Eliminado!", "", "success");
      }
    });
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary">Departamentos</h2>
        <Link to="/crear-departamento" className="btn btn-success btn-sm">
          + Nuevo Departamento
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {departamentos.map((d) => (
              <tr key={d.id}>
                <td>{d.nombre}</td>
                <td className="text-end">
                  <div className="btn-group">
                    <Link to={`/editar-departamento/${d.id}`} className="btn btn-warning btn-sm me-2">
                      Editar
                    </Link>
                    <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(d.id)}>
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

export default DepartamentoList;
