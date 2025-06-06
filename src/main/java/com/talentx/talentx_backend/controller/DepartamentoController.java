package com.talentx.talentx_backend.controller;

import com.talentx.talentx_backend.model.Departamento;
import com.talentx.talentx_backend.service.DepartamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/departamentos")
public class DepartamentoController {

    @Autowired
    private DepartamentoService service;

    @GetMapping
    public List<Departamento> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Departamento buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @PostMapping
    public Departamento guardar(@RequestBody Departamento d) {
        return service.guardar(d);
    }

    @PutMapping
    public Departamento actualizar(@RequestBody Departamento d) {
        return service.guardar(d);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}

