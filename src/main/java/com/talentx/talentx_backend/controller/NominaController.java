package com.talentx.talentx_backend.controller;

import com.talentx.talentx_backend.model.Nomina;
import com.talentx.talentx_backend.service.NominaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nomina")
@CrossOrigin("*")
public class NominaController {

    @Autowired
    private NominaService service;

    @GetMapping
    public List<Nomina> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Nomina buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @PostMapping
    public Nomina guardar(@RequestBody Nomina nomina) {
        // Se calculará automáticamente el salario antes de guardar
        return service.guardar(nomina);
    }

    @PutMapping
    public Nomina actualizar(@RequestBody Nomina nomina) {
        // También se recalcula al actualizar
        return service.guardar(nomina);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}
