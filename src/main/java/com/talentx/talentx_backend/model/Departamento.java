package com.talentx.talentx_backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Departamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
}

