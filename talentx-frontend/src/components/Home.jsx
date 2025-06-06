import React from "react";

const Home = () => (
  <div className="container mt-5">

    {/* Bienvenida */}
    <div className="card shadow p-5 text-center mb-5">
      <h1 className="text-primary mb-3">Bienvenido a TalentX</h1>
      <p className="lead">
        TalentX es una plataforma de gestión de talento humano que permite controlar empleados, departamentos, nómina y generar informes personalizados en PDF.
      </p>
    </div>

    {/* Qué es TalentX */}
    <div className="row text-center mb-5">
      <div className="col">
        <h2 className="mb-4">¿Qué puedes hacer en TalentX?</h2>
      </div>
    </div>
    <div className="row row-cols-1 row-cols-md-3 g-4 text-center">
      <div className="col">
        <div className="card border-0">
          <div className="card-body">
            <h5>👥 Gestión de Empleados</h5>
            <p>Registra y administra información clave de tus empleados.</p>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card border-0">
          <div className="card-body">
            <h5>🏢 Control de Departamentos</h5>
            <p>Organiza tu empresa por áreas o departamentos de forma estructurada.</p>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card border-0">
          <div className="card-body">
            <h5>📑 Generación de Informes</h5>
            <p>Obtén reportes en PDF con solo un clic, listos para imprimir o enviar.</p>
          </div>
        </div>
      </div>
    </div>

    {/* Sección de informes */}
    <div className="row text-center mt-5 mb-3">
      <div className="col">
        <h2>📄 Generar Informes</h2>
        <p>Selecciona un informe para descargarlo en formato PDF.</p>
      </div>
    </div>

    <div className="row row-cols-1 row-cols-md-2 g-4 mb-5">
      {/* Informe de Empleados */}
      <div className="col">
        <div className="card h-100 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">📋 Informe de Empleados</h5>
            <p className="card-text">Lista completa de empleados con nombre, correo, departamento y cargo.</p>
            <a
              href="http://localhost:8080/api/informes/empleados"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              📥 Descargar PDF
            </a>
          </div>
        </div>
      </div>

      {/* Informe de Departamentos */}
      <div className="col">
        <div className="card h-100 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">🏢 Informe de Departamentos</h5>
            <p className="card-text">Listado de departamentos registrados con sus datos básicos.</p>
            <a
              href="http://localhost:8080/api/informes/departamentos"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success"
            >
              📥 Descargar PDF
            </a>
          </div>
        </div>
      </div>

      {/* Informe de Nómina */}
      <div className="col">
        <div className="card h-100 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">💰 Informe de Nómina</h5>
            <p className="card-text">Resumen de pagos realizados a empleados, fechas y montos.</p>
            <a
              href="http://localhost:8080/api/informes/nomina"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-warning"
            >
              📥 Descargar PDF
            </a>
          </div>
        </div>
      </div>

      {/* Informe futuro */}
      <div className="col">
        <div className="card h-100 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">📌 Otros Informes</h5>
            <p className="card-text">Reportes adicionales o personalizados disponibles próximamente.</p>
            <button className="btn btn-secondary" disabled>
              🚧 En desarrollo
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
);

export default Home;
