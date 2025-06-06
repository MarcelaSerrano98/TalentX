import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          TalentX
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/empleados">
                Empleados
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/departamentos">
                Departamentos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cargos">
                Cargos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/asistencias">
                Asistencias
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/nomina">
                Gestión de Nómina
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/usuarios">
                Usuarios
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/informes">
                Informes
              </Link>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
