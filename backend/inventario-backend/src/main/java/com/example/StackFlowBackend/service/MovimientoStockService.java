package com.example.StackFlowBackend.service;

import com.example.StackFlowBackend.model.MovimientoStock;
import com.example.StackFlowBackend.model.Producto;
import com.example.StackFlowBackend.repository.MovimientoStockRepository;
import com.example.StackFlowBackend.repository.ProductoRepository;
import org.springframework.stereotype.Service;

@Service
public class MovimientoStockService {

    private final MovimientoStockRepository movimientoRepo;
    private final ProductoRepository productoRepo;

    public MovimientoStockService(MovimientoStockRepository movimientoRepo, ProductoRepository productoRepo) {
        this.movimientoRepo = movimientoRepo;
        this.productoRepo = productoRepo;
    }

    public MovimientoStock registrarMovimiento(MovimientoStock movimiento) {
        Producto producto = productoRepo.findById(movimiento.getProducto().getId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        int nuevoStock = producto.getStock() + movimiento.getCantidad();

        if (nuevoStock < 0) {
            throw new RuntimeException("No hay stock suficiente para esta salida");
        }

        producto.setStock(nuevoStock);
        productoRepo.save(producto);

        return movimientoRepo.save(movimiento);
    }

    public Iterable<MovimientoStock> findAll() {
        return movimientoRepo.findAll();
    }
}
