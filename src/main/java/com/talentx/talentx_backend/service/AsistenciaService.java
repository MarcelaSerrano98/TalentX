package com.talentx.talentx_backend.service;


import com.talentx.talentx_backend.model.Asistencia;
import com.talentx.talentx_backend.repository.AsistenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AsistenciaService {

    @Autowired
    private AsistenciaRepository repo;

    public List<Asistencia> listar() {
        return repo.findAll();
    }

    public Asistencia guardar(Asistencia asistencia) {
        return repo.save(asistencia);
    }

    public Asistencia buscar(Long id) {
        return repo.findById(id).orElse(null);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}