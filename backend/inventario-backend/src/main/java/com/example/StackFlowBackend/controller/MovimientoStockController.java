package com.example.StackFlowBackend.controller;

import com.example.StackFlowBackend.model.MovimientoStock;
import com.example.StackFlowBackend.service.MovimientoStockService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movimientos")
@CrossOrigin(origins = "http://localhost:4200")
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
    public MovimientoStock registrar(@RequestBody MovimientoStock movimiento) {
        return movimientoService.registrarMovimiento(movimiento);
    }
}
