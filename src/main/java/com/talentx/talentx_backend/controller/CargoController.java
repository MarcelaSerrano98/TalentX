package com.talentx.talentx_backend.controller;


import com.talentx.talentx_backend.model.Cargo;
import com.talentx.talentx_backend.service.CargoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/cargos")
public class CargoController {

    @Autowired
    private CargoService service;

    @GetMapping
    public List<Cargo> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Cargo buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @PostMapping
    public Cargo guardar(@RequestBody Cargo c) {
        return service.guardar(c);
    }

    @PutMapping
    public Cargo actualizar(@RequestBody Cargo c) {
        return service.guardar(c);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}