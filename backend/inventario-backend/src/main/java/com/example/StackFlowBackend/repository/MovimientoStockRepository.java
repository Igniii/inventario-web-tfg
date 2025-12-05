package com.example.StackFlowBackend.repository;

import com.example.StackFlowBackend.model.MovimientoStock;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;

public interface MovimientoStockRepository extends JpaRepository<MovimientoStock, Long> {
    long countByFechaBetween(LocalDateTime start, LocalDateTime end);

}
