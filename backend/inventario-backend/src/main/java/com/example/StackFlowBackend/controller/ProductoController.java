package com.example.StackFlowBackend.controller;

import com.example.StackFlowBackend.model.Producto;
import com.example.StackFlowBackend.service.ProductoService;
import org.springframework.web.bind.annotation.*;
import java.util.stream.Collectors;


import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductoController {

    private final ProductoService service;

    public ProductoController(ProductoService service) {
        this.service = service;
    }
    @GetMapping("/criticos")
    public List<ProductoCriticoDTO> getProductosCriticos() {
        return service.obtenerProductosCriticos()
                .stream()
                .map(p -> new ProductoCriticoDTO(p.getId(), p.getNombre(), p.getStock(), p.getStockMinimo()))
                .collect(Collectors.toList());
    }
    @GetMapping
    public List<Producto> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Producto getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public Producto create(@RequestBody Producto producto) {
        return service.save(producto);
    }

    @PutMapping("/{id}")
    public Producto update(@PathVariable Long id, @RequestBody Producto data) {
        return service.update(id, data);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }


    public static record ProductoCriticoDTO(Long id, String nombre, Integer stock, Integer stockMinimo) {}

}

