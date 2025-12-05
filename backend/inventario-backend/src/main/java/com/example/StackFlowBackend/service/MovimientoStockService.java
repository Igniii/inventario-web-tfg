package com.example.StackFlowBackend.service;

import com.example.StackFlowBackend.model.MovimientoStock;
import com.example.StackFlowBackend.model.Producto;
import com.example.StackFlowBackend.repository.MovimientoStockRepository;
import com.example.StackFlowBackend.repository.ProductoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class MovimientoStockService {

    private final MovimientoStockRepository movimientoRepo;
    private final ProductoRepository productoRepo;

    public MovimientoStockService(MovimientoStockRepository movimientoRepo, ProductoRepository productoRepo) {
        this.movimientoRepo = movimientoRepo;
        this.productoRepo = productoRepo;
    }

    /**
     * Registra un movimiento y actualiza el stock.
     * El username se proporciona desde el controller (Principal).
     */
    @Transactional
    public MovimientoStock registrarMovimiento(MovimientoStock movimiento, String username) {
        if (movimiento == null || movimiento.getProducto() == null || movimiento.getProducto().getId() == null) {
            throw new IllegalArgumentException("Movimiento o producto inválido");
        }

        Producto producto = productoRepo.findById(movimiento.getProducto().getId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        int cantidad = movimiento.getCantidad();
        int nuevoStock;

        if (movimiento.getTipo() == MovimientoStock.TipoMovimiento.SALIDA) {
            nuevoStock = producto.getStock() - cantidad;
        } else { // ENTRADA (por defecto)
            nuevoStock = producto.getStock() + cantidad;
        }

        if (nuevoStock < 0) {
            throw new RuntimeException("No hay stock suficiente para esta salida");
        }

        producto.setStock(nuevoStock);
        productoRepo.save(producto);


        movimiento.setProducto(producto);
        movimiento.setUsuarioResponsable(username);

        movimiento.setFecha(LocalDateTime.now());

        return movimientoRepo.save(movimiento);
    }

    public Iterable<MovimientoStock> findAll() {
        return movimientoRepo.findAll();
    }
}
