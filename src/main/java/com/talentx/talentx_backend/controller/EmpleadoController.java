package com.talentx.talentx_backend.controller;

import com.talentx.talentx_backend.model.Empleado;
import com.talentx.talentx_backend.service.EmpleadoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/empleados")
@CrossOrigin(origins = "http://localhost:5173")
public class EmpleadoController {

    private final EmpleadoService empleadoService;

    public EmpleadoController(EmpleadoService empleadoService) {
        this.empleadoService = empleadoService;
    }

    @GetMapping
    public List<Empleado> listar() {
        return empleadoService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public Optional<Empleado> obtenerPorId(@PathVariable Long id) {
        return empleadoService.obtenerPorId(id);
    }

    @PostMapping
    public Empleado crear(@RequestBody Empleado empleado) {
        return empleadoService.guardar(empleado);
    }

    @PutMapping
    public Empleado actualizar(@RequestBody Empleado empleado) {
        return empleadoService.guardar(empleado);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        empleadoService.eliminar(id);
    }
}

