package com.example.StackFlowBackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Map;

import com.example.StackFlowBackend.repository.ProductoRepository;
import com.example.StackFlowBackend.repository.MovimientoStockRepository;
import com.example.StackFlowBackend.model.Producto;

@RestController
public class DashboardController {

    private final ProductoRepository productoRepository;
    private final MovimientoStockRepository movimientoRepository;

    public DashboardController(ProductoRepository productoRepository,
                               MovimientoStockRepository movimientoRepository) {
        this.productoRepository = productoRepository;
        this.movimientoRepository = movimientoRepository;
    }

    @GetMapping("/api/dashboard/stats")
    public Map<String, Object> getStats() {

        long totalProductos = productoRepository.count();

        // Calcular movimientos del día (hoy)
        LocalDate today = LocalDate.now();
        LocalDateTime start = today.atStartOfDay();
        LocalDateTime end = today.atTime(LocalTime.MAX);

        long movimientosHoy = movimientoRepository.countByFechaBetween(start, end);

        // Sumar stock total de todos los productos
        long totalInventario = productoRepository.findAll()
                .stream()
                .mapToLong(Producto::getStock)
                .sum();

        // NUEVO: cantidad de productos críticos
        long productosCriticos = productoRepository.findProductosCriticos().size();

        return Map.of(
                "totalInventario", totalInventario,
                "totalProductos", totalProductos,
                "movimientosHoy", movimientosHoy,
                "productosCriticos", productosCriticos
        );
    }

}
