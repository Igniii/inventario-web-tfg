package com.example.StackFlowBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.StackFlowBackend.model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    boolean existsByProveedorId(Long proveedorId);
}
