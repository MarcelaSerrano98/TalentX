package com.talentx.talentx_backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Nomina {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Integer horasTrabajadas;
  private Integer horasNocturnas;
  private Integer horasExtras;
  private Double bonificaciones;
  private Double salarioCalculado;
  private Double deducciones;

  private String mes;

  @ManyToOne
  @JoinColumn(name = "empleado_id", nullable = false)
  private Empleado empleado;
}
