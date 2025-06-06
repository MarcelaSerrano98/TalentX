package com.talentx.talentx_backend.model;


import jakarta.persistence.*;

@Entity
public class Empleado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String correo;
    private double salario;

    @ManyToOne
    @JoinColumn(name = "departamento_id")
    private Departamento departamento;

    @ManyToOne
    @JoinColumn(name = "cargo_id")
    private Cargo cargo;



    public Empleado() {}

    public Empleado(String nombre, String correo, double salario) {
        this.nombre = nombre;
        this.correo = correo;
        this.salario = salario;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public double getSalario() { return salario; }
    public void setSalario(double salario) { this.salario = salario; }

    public Departamento getDepartamento() {return departamento;}
    public void setDepartamento(Departamento departamento) {this.departamento = departamento;}

    public Cargo getCargo() {return cargo;}

    public void setCargo(Cargo cargo) {
this.cargo = cargo;
}

}


