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

    public Producto update(Long id, Producto data) {
        Producto p = repository.findById(id).orElse(null);
        if (p == null) return null;

        p.setNombre(data.getNombre());
        p.setDescripcion(data.getDescripcion());
        p.setStock(data.getStock());
        p.setPrecio(data.getPrecio());
        p.setCategoria(data.getCategoria());
        p.setProveedor(data.getProveedor());

        return repository.save(p);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
/**/