package com.talentx.talentx_backend.service;


import com.talentx.talentx_backend.model.Cargo;
import com.talentx.talentx_backend.repository.CargoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CargoService {
    @Autowired
    private CargoRepository repo;

    public List<Cargo> listar() {
        return repo.findAll();
    }

    public Cargo guardar(Cargo c) {
        return repo.save(c);
    }

    public Cargo buscar(Long id) {
        return repo.findById(id).orElse(null);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
