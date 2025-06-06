import React, { useEffect, useState } from "react";
import { getNominas, eliminarNomina } from "../services/NominaService";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const NominaList = () => {
  const [nominas, setNominas] = useState([]);

  const cargarNominas = async () => {
    try {
      const res = await getNominas();
      setNominas(res.data);
    } catch (error) {
      Swal.fire("Error", "No se pudieron cargar las nóminas", "error");
    }
  };

  const handleEliminar = async (id) => {
    Swal.fire({
      title: "¿Eliminar registro de nómina?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminarNomina(id);
          cargarNominas();
          Swal.fire("Eliminado", "Registro eliminado con éxito", "success");
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar la nómina", "error");
        }
      }
    });
  };

  useEffect(() => {
    cargarNominas();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary">Gestión de Nómina</h2>
        <Link to="/crear-nomina" className="btn btn-success btn-sm">
          + Registrar Nómina
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Empleado</th>
              <th>Mes</th>
              <th>Horas Trabajadas</th>
              <th>Horas Extras</th>
              <th>Horas Nocturnas</th>
              <th>Bonificaciones</th>
              <th>Salario Calculado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {nominas.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  No hay registros de nómina
                </td>
              </tr>
            ) : (
              nominas.map((n) => (
                <tr key={n.id}>
                  <td>{n.empleado?.nombre}</td>
                  <td>{n.mes?.substring(0, 7)}</td>
                  <td>{n.horasTrabajadas}</td>
                  <td>{n.horasExtras}</td>
                  <td>{n.horasNocturnas}</td>
                  <td>${n.bonificaciones?.toFixed(2)}</td>
                  <td>${n.salarioCalculado?.toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => handleEliminar(n.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Eliminar
                    </button>
                    {/* Puedes agregar botón de editar si quieres */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NominaList;
