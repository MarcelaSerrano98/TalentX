package com.talentx.talentx_backend.controller;


import com.talentx.talentx_backend.model.Usuario;
import com.talentx.talentx_backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @GetMapping
    public List<Usuario> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Usuario buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @PostMapping
    public Usuario guardar(@RequestBody Usuario u) {
        return service.guardar(u);
    }

    @PutMapping
    public Usuario actualizar(@RequestBody Usuario u) {
        return service.guardar(u);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}