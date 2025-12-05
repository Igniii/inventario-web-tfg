package com.example.StackFlowBackend.controller;

import com.example.StackFlowBackend.model.MovimientoStock;
import com.example.StackFlowBackend.service.MovimientoStockService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/movimientos")
@CrossOrigin(origins = "*")
public class MovimientoStockController {

    private final MovimientoStockService movimientoService;

    public MovimientoStockController(MovimientoStockService movimientoService) {
        this.movimientoService = movimientoService;
    }

    @GetMapping
    public Iterable<MovimientoStock> getAll() {
        return movimientoService.findAll();
    }

    @PostMapping
    public ResponseEntity<MovimientoStock> registrar(@RequestBody MovimientoStock movimiento, Principal principal) {
        String username = principal != null ? principal.getName() : "UNKNOWN";
        MovimientoStock creado = movimientoService.registrarMovimiento(movimiento, username);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }
}
