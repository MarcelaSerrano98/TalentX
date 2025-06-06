package com.talentx.talentx_backend.service;

import com.talentx.talentx_backend.model.Empleado;
import com.talentx.talentx_backend.model.Nomina;
import com.talentx.talentx_backend.repository.EmpleadoRepository;
import com.talentx.talentx_backend.repository.NominaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NominaService {

  @Autowired
  private NominaRepository repo;

  @Autowired
  private EmpleadoRepository empleadoRepository;

  public List<Nomina> listar() {
    return repo.findAll();
  }

  public Nomina buscar(Long id) {
    return repo.findById(id).orElse(null);
  }

  public void eliminar(Long id) {
    repo.deleteById(id);
  }

  public Nomina guardar(Nomina n) {
    return calcularYGuardarNomina(n);
  }

  private Nomina calcularYGuardarNomina(Nomina nomina) {
    // Buscar empleado, lanzar excepción clara si no existe
    Empleado emp = empleadoRepository.findById(nomina.getEmpleado().getId())
            .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));

    double salarioBase = emp.getSalario();
    double valorHora = salarioBase / 240.0; // 240 horas por mes estándar

    // Null-safe con valores por defecto
    double horasExtras = nomina.getHorasExtras() != null ? nomina.getHorasExtras() : 0;
    double horasNocturnas = nomina.getHorasNocturnas() != null ? nomina.getHorasNocturnas() : 0;
    double bonificaciones = nomina.getBonificaciones() != null ? nomina.getBonificaciones() : 0;

    // Cálculo de recargos legales
    double totalExtras = horasExtras * valorHora * 1.25;   // 25% extra
    double totalNocturnas = horasNocturnas * valorHora * 1.35; // 35% extra

    double totalDevengado = salarioBase + totalExtras + totalNocturnas + bonificaciones;

    // Deducciones (salud y pensión 4% cada una)
    double salud = totalDevengado * 0.04;
    double pension = totalDevengado * 0.04;

    // Auxilio de transporte (si salarioBase <= 2 SMMLV)
    double auxTransporte = salarioBase <= (2 * 1300000) ? 162000.0 : 0.0;

    double totalDeducciones = salud + pension;
    double salarioNeto = totalDevengado + auxTransporte - totalDeducciones;

    // Guardar valores en la nómina
    nomina.setSalarioCalculado(salarioNeto);
    nomina.setDeducciones(totalDeducciones);

    return repo.save(nomina);
  }
}
