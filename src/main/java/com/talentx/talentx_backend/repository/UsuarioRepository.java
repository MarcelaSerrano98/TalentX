package com.talentx.talentx_backend.repository;


import com.talentx.talentx_backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}