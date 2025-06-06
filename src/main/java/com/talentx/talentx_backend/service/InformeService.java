package com.talentx.talentx_backend.service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import com.talentx.talentx_backend.model.Empleado;
import com.talentx.talentx_backend.model.Departamento;
import com.talentx.talentx_backend.model.Nomina;
import com.talentx.talentx_backend.repository.EmpleadoRepository;
import com.talentx.talentx_backend.repository.DepartamentoRepository;
import com.talentx.talentx_backend.repository.NominaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.Color;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class InformeService {
    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Autowired
    private DepartamentoRepository departamentoRepository;

    @Autowired
    private NominaRepository nominaRepository;

    // Informe de empleados
    public ByteArrayInputStream generarInformeEmpleadosPDF() {
        Document document = new Document(PageSize.A4);
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            // Título
            Font tituloFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, Color.BLACK);
            Paragraph titulo = new Paragraph("Informe de Empleados", tituloFont);
            titulo.setAlignment(Element.ALIGN_CENTER);
            titulo.setSpacingAfter(20);
            document.add(titulo);

            // Tabla con 4 columnas
            PdfPTable table = new PdfPTable(4);
            table.setWidthPercentage(100);
            table.setWidths(new int[]{4, 6, 4, 4});

            // Encabezados
            Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            PdfPCell hcell;

            hcell = new PdfPCell(new Phrase("Nombre", headFont));
            hcell.setBackgroundColor(Color.LIGHT_GRAY);
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(hcell);

            hcell = new PdfPCell(new Phrase("Correo", headFont));
            hcell.setBackgroundColor(Color.LIGHT_GRAY);
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(hcell);

            hcell = new PdfPCell(new Phrase("Departamento", headFont));
            hcell.setBackgroundColor(Color.LIGHT_GRAY);
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(hcell);

            hcell = new PdfPCell(new Phrase("Cargo", headFont));
            hcell.setBackgroundColor(Color.LIGHT_GRAY);
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(hcell);

            // Datos de empleados
            List<Empleado> empleados = empleadoRepository.findAll();

            for (Empleado emp : empleados) {
                PdfPCell cell;

                cell = new PdfPCell(new Phrase(emp.getNombre()));
                cell.setPaddingLeft(5);
                cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                table.addCell(cell);

                cell = new PdfPCell(new Phrase(emp.getCorreo()));
                cell.setPaddingLeft(5);
                cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                table.addCell(cell);

                String depto = emp.getDepartamento() != null ? emp.getDepartamento().getNombre() : "-";
                cell = new PdfPCell(new Phrase(depto));
                cell.setPaddingLeft(5);
                cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                table.addCell(cell);

                String cargo = emp.getCargo() != null ? emp.getCargo().getNombre() : "-";
                cell = new PdfPCell(new Phrase(cargo));
                cell.setPaddingLeft(5);
                cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                table.addCell(cell);
            }

            document.add(table);
            document.close();

        } catch (DocumentException ex) {
            throw new RuntimeException("Error al generar PDF: " + ex.getMessage());
        }

        return new ByteArrayInputStream(out.toByteArray());
    }

    // Informe de departamentos
    public ByteArrayInputStream generarInformeDepartamentosPDF() {
        Document document = new Document(PageSize.A4);
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            // Título
            Font tituloFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, Color.BLACK);
            Paragraph titulo = new Paragraph("Informe de Departamentos", tituloFont);
            titulo.setAlignment(Element.ALIGN_CENTER);
            titulo.setSpacingAfter(20);
            document.add(titulo);

            // Tabla con 2 columnas: ID y Nombre
            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);
            table.setWidths(new int[]{2, 6});

            // Encabezados
            Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            PdfPCell hcell;

            hcell = new PdfPCell(new Phrase("ID", headFont));
            hcell.setBackgroundColor(Color.LIGHT_GRAY);
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(hcell);

            hcell = new PdfPCell(new Phrase("Nombre", headFont));
            hcell.setBackgroundColor(Color.LIGHT_GRAY);
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(hcell);

            // Datos departamentos
            List<Departamento> departamentos = departamentoRepository.findAll();

            for (Departamento depto : departamentos) {
                PdfPCell cell;

                cell = new PdfPCell(new Phrase(depto.getId().toString()));
                cell.setPaddingLeft(5);
                cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                table.addCell(cell);

                cell = new PdfPCell(new Phrase(depto.getNombre()));
                cell.setPaddingLeft(5);
                cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                table.addCell(cell);
            }

            document.add(table);
            document.close();

        } catch (DocumentException ex) {
            throw new RuntimeException("Error al generar PDF: " + ex.getMessage());
        }

        return new ByteArrayInputStream(out.toByteArray());
    }

    // Informe de nómina (ejemplo simple)
    public ByteArrayInputStream generarInformeNominaPDF() {
        Document document = new Document(PageSize.A4);
        ByteArrayOutputStream out = new ByteArrayOutputStream();
    
        try {
            PdfWriter.getInstance(document, out);
            document.open();
    
            Font tituloFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, Color.BLACK);
            Paragraph titulo = new Paragraph("Informe de Nómina", tituloFont);
            titulo.setAlignment(Element.ALIGN_CENTER);
            titulo.setSpacingAfter(20);
            document.add(titulo);
    
            PdfPTable table = new PdfPTable(5); // ID, Empleado, Salario, Horas, Mes
            table.setWidthPercentage(100);
            table.setWidths(new int[]{2, 6, 4, 4, 4});
    
            Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            String[] headers = {"ID", "Empleado", "Salario", "Horas", "Mes"};
            for (String h : headers) {
                PdfPCell cell = new PdfPCell(new Phrase(h, headFont));
                cell.setBackgroundColor(Color.LIGHT_GRAY);
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(cell);
            }
    
            List<Nomina> nominas = nominaRepository.findAll();
    
            for (Nomina n : nominas) {
                table.addCell(n.getId().toString());
                table.addCell(n.getEmpleado() != null ? n.getEmpleado().getNombre() : "Sin asignar");
                table.addCell(String.format("$%.2f", n.getSalarioCalculado()));
                table.addCell(String.valueOf(n.getHorasTrabajadas()));
                table.addCell(n.getMes() != null ? n.getMes().toString() : "N/A");
            }
    
            document.add(table);
            document.close();
    
        } catch (DocumentException ex) {
            throw new RuntimeException("Error al generar PDF: " + ex.getMessage());
        }
    
        return new ByteArrayInputStream(out.toByteArray());
    }
}    
