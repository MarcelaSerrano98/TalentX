package com.talentx.talentx_backend.service;



import com.talentx.talentx_backend.model.Departamento;
import com.talentx.talentx_backend.repository.DepartamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartamentoService {
    @Autowired
    private DepartamentoRepository repo;

    public List<Departamento> listar() {
        return repo.findAll();
    }

    public Departamento guardar(Departamento d) {
        return repo.save(d);
    }

    public Departamento buscar(Long id) {
        return repo.findById(id).orElse(null);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
