import React, { useEffect, useState } from "react";
import { getUsuarios, eliminarUsuario } from "../services/UsuarioService";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([]);

  const cargarUsuarios = async () => {
    const res = await getUsuarios();
    setUsuarios(res.data);
  };

  const handleEliminar = async (id) => {
    Swal.fire({
      title: "¿Eliminar usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminarUsuario(id);
        cargarUsuarios();
        Swal.fire("Eliminado", "Usuario eliminado con éxito", "success");
      }
    });
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary">Gestión de Usuarios</h2>
        <Link to="/crear-usuario" className="btn btn-success btn-sm">
          + Agregar Usuario
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.nombre}</td>
                <td>{u.correo}</td>
                <td>{u.rol}</td>
                <td>
                  <div className="btn-group">
                    <Link to={`/editar-usuario/${u.id}`} className="btn btn-warning btn-sm">
                      Editar
                    </Link>
                    <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(u.id)}>
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

export default UsuarioList;
