package com.example.StackFlowBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.StackFlowBackend.model.Producto;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    boolean existsByProveedorId(Long proveedorId);
    @Query("SELECT p FROM Producto p WHERE p.stock <= p.stockMinimo")
    List<Producto> findProductosCriticos();
}
