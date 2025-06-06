import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Componentes generales
import Navbar from "./components/NavBar";
import Home from "./components/Home";

// Empleados
import EmpleadoList from "./components/EmpleadoList";
import EmpleadoForm from "./components/EmpleadoForm";

// Departamentos y Cargos
import DepartamentoList from "./components/DepartamentoList";
import DepartamentoForm from "./components/DepartamentoForm";
import CargoList from "./components/CargoList";
import CargoForm from "./components/CargoForm";

// Nuevas funcionalidades
import AsistenciaList from "./components/AsistenciaList";
import AsistenciaForm from "./components/AsistenciaForm";

import NominaList from "./components/NominaList";
import NominaForm from "./components/NominaForm";
import UsuarioList from "./components/UsuarioList";
import UsuarioForm from "./components/UsuarioForm";
import Informes from "./components/informes";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          {/* Inicio */}
          <Route path="/" element={<Home />} />

          {/* Empleados */}
          <Route path="/empleados" element={<EmpleadoList />} />
          <Route path="/crear-empleado" element={<EmpleadoForm />} />
          <Route path="/editar/:id" element={<EmpleadoForm />} />

          {/* Departamentos */}
          <Route path="/departamentos" element={<DepartamentoList />} />
          <Route path="/crear-departamento" element={<DepartamentoForm />} />
          <Route path="/editar-departamento/:id" element={<DepartamentoForm />} />

          {/* Cargos */}
          <Route path="/cargos" element={<CargoList />} />
          <Route path="/crear-cargo" element={<CargoForm />} />
          <Route path="/editar-cargo/:id" element={<CargoForm />} />

          {/* Asistencias */}
          <Route path="/asistencias" element={<AsistenciaList />} />
          <Route path="/crear-asistencia" element={<AsistenciaForm />} />


          {/* Nómina */}
          <Route path="/nomina" element={<NominaList />} />
          <Route path="/crear-nomina" element={<NominaForm />} />


          {/* Usuarios */}
          
          <Route path="/usuarios" element={<UsuarioList />} />
          <Route path="/crear-usuario" element={<UsuarioForm />} />
          <Route path="/editar-usuario/:id" element={<UsuarioForm />} />

          {/* Informes */}
          <Route path="/informes" element={<Informes />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
