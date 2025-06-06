package com.talentx.talentx_backend.model;


import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Asistencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fecha;
    private String estado; // Asistió, Inasistencia, Retardo
    private String observaciones;

    @ManyToOne
    @JoinColumn(name = "empleado_id")
    private Empleado empleado;
}
