package com.talentx.talentx_backend.controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.talentx.talentx_backend.service.InformeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/informes")
public class InformeController {

    @Autowired
    private InformeService informeService;

    @GetMapping("/empleados")
    public ResponseEntity<byte[]> descargarInformeEmpleados() {
        return generarPDFResponse(informeService.generarInformeEmpleadosPDF(), "empleados.pdf");
    }

    @GetMapping("/departamentos")
    public ResponseEntity<byte[]> descargarInformeDepartamentos() {
        return generarPDFResponse(informeService.generarInformeDepartamentosPDF(), "departamentos.pdf");
    }

    @GetMapping("/nomina")
    public ResponseEntity<byte[]> descargarInformeNomina() {
        return generarPDFResponse(informeService.generarInformeNominaPDF(), "nomina.pdf");
    }

    // Método auxiliar para evitar repetir código
    private ResponseEntity<byte[]> generarPDFResponse(ByteArrayInputStream bis, String filename) {
        try {
            byte[] pdfBytes = bis.readAllBytes();
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "inline; filename=" + filename);

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfBytes);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
