package com.example.StackFlowBackend.service;

import com.example.StackFlowBackend.model.Categoria;
import com.example.StackFlowBackend.repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public List<Categoria> findAll() {
        return categoriaRepository.findAll();
    }

    public Categoria save(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public Categoria update(Long id, Categoria updated) {
        Categoria cat = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No existe categoría"));
        cat.setNombre(updated.getNombre());
        return categoriaRepository.save(cat);
    }

    public void delete(Long id) {
        categoriaRepository.deleteById(id);
    }
}
