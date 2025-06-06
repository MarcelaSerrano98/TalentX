package com.talentx.talentx_backend.repository;

import com.talentx.talentx_backend.model.Empleado;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
}

