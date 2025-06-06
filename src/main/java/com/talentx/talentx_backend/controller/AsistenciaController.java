package com.talentx.talentx_backend.controller;

import com.talentx.talentx_backend.model.Asistencia;
import com.talentx.talentx_backend.service.AsistenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/asistencias")
public class AsistenciaController {

    @Autowired
    private AsistenciaService service;

    @GetMapping
    public List<Asistencia> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Asistencia buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @PostMapping
    public Asistencia guardar(@RequestBody Asistencia asistencia) {
        return service.guardar(asistencia);
    }

    @PutMapping
    public Asistencia actualizar(@RequestBody Asistencia asistencia) {
        return service.guardar(asistencia);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}