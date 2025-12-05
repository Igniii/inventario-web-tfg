package com.example.StackFlowBackend.controller;

import com.example.StackFlowBackend.model.Proveedor;
import com.example.StackFlowBackend.repository.ProductoRepository;
import com.example.StackFlowBackend.service.ProveedorService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proveedores")
@CrossOrigin(origins = "*")
public class ProveedorController {

    private final ProveedorService proveedorService;
    private final ProductoRepository productoRepository;

    public ProveedorController(ProveedorService proveedorService,
                               ProductoRepository productoRepository) {
        this.proveedorService = proveedorService;
        this.productoRepository = productoRepository;
    }

    @GetMapping
    public List<Proveedor> getAll() {
        return proveedorService.findAll();
    }

    @GetMapping("/{id}")
    public Proveedor getById(@PathVariable Long id) {
        return proveedorService.findById(id);
    }

    @PostMapping
    public Proveedor create(@RequestBody Proveedor proveedor) {
        return proveedorService.save(proveedor);
    }

    @PutMapping("/{id}")
    public Proveedor update(@PathVariable Long id, @RequestBody Proveedor data) {
        Proveedor p = proveedorService.findById(id);
        if (p == null) return null;

        p.setNombre(data.getNombre());
        p.setContacto(data.getContacto());

        return proveedorService.save(p);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {

        if (productoRepository.existsByProveedorId(id)) {
            return ResponseEntity
                    .status(409)
                    .body("No se puede eliminar: el proveedor tiene productos asociados");
        }

        proveedorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
