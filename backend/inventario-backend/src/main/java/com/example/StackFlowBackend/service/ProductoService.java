package com.example.StackFlowBackend.service;

import com.example.StackFlowBackend.model.Producto;
import com.example.StackFlowBackend.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService {

    private final ProductoRepository repository;

    public ProductoService(ProductoRepository repository) {
        this.repository = repository;
    }

    public List<Producto> findAll() {
        return repository.findAll();
    }

    public Producto findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Producto save(Producto producto) {
        return repository.save(producto);
    }

    public Producto update(Long id, Producto producto) {
        Producto existing = findById(id);
        if (existing == null) return null;

        existing.setNombre(producto.getNombre());
        existing.setDescripcion(producto.getDescripcion());
        existing.setStock(producto.getStock());
        existing.setPrecio(producto.getPrecio());

        return repository.save(existing);
    }

    public void delete(Long id) {

        repository.deleteById(id);

    }
}
