import React, { useEffect, useState } from "react";
import { getCargos, eliminarCargo } from "../services/CargoService";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CargoList = () => {
  const [cargos, setCargos] = useState([]);

  const cargarCargos = async () => {
    const res = await getCargos();
    setCargos(res.data);
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
        await eliminarCargo(id);
        cargarCargos();
        Swal.fire("¡Eliminado!", "Cargo eliminado con éxito.", "success");
      }
    });
  };

  useEffect(() => {
    cargarCargos();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary">Lista de Cargos</h2>
        <Link to="/crear-cargo" className="btn btn-success btn-sm">
          + Agregar Cargo
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cargos.map((c) => (
              <tr key={c.id}>
                <td>{c.nombre}</td>
                <td>{c.descripcion}</td>
                <td>
                  <div className="btn-group">
                    <Link to={`/editar-cargo/${c.id}`} className="btn btn-warning btn-sm">
                      Editar
                    </Link>
                    <button onClick={() => handleEliminar(c.id)} className="btn btn-danger btn-sm">
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

export default CargoList;
