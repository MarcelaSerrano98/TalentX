import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  crearUsuario,
  actualizarUsuario,
  getUsuarioById,
} from "../services/UsuarioService";
import Swal from "sweetalert2";

const UsuarioForm = () => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    correo: "",
    rol: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const cargarUsuario = async () => {
    if (id) {
      const res = await getUsuarioById(id);
      setUsuario(res.data);
    }
  };

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await actualizarUsuario(usuario);
      Swal.fire("Actualizado", "Usuario actualizado con éxito", "success");
    } else {
      await crearUsuario(usuario);
      Swal.fire("Creado", "Usuario registrado con éxito", "success");
    }
    navigate("/usuarios");
  };

  useEffect(() => {
    cargarUsuario();
  }, []);

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow w-100" style={{ maxWidth: "500px" }}>
        <h3 className="text-center mb-4 text-primary">
          {id ? "Editar Usuario" : "Registrar Usuario"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              placeholder="Nombre"
              value={usuario.nombre}
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
              value={usuario.correo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Rol</label>
            <select
              name="rol"
              className="form-select"
              value={usuario.rol}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione Rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Empleado">Empleado</option>
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

export default UsuarioForm;
