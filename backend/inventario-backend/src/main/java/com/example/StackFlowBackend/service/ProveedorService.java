package com.example.StackFlowBackend.service;

import com.example.StackFlowBackend.model.Proveedor;
import com.example.StackFlowBackend.repository.ProveedorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProveedorService {

    private final ProveedorRepository proveedorRepository;

    public ProveedorService(ProveedorRepository proveedorRepository) {
        this.proveedorRepository = proveedorRepository;
    }

    public List<Proveedor> findAll() {
        return proveedorRepository.findAll();
    }

    public Proveedor save(Proveedor p) {
        return proveedorRepository.save(p);
    }

    public void delete(Long id) {
        proveedorRepository.deleteById(id);
    }

    public Proveedor findById(Long id) {
        return proveedorRepository.findById(id).orElse(null);
    }
}
