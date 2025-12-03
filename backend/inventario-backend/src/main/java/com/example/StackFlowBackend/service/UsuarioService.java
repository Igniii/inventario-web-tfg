package com.example.StackFlowBackend.service;

import com.example.StackFlowBackend.dto.UserRequest;
import com.example.StackFlowBackend.model.Usuario;
import com.example.StackFlowBackend.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepo;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepo, PasswordEncoder passwordEncoder) {
        this.usuarioRepo = usuarioRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Usuario> getAll() {
        return usuarioRepo.findAll();
    }

    public Usuario create(UserRequest req) {
        Usuario u = new Usuario();
        u.setUsername(req.username);
        u.setPassword(passwordEncoder.encode(req.password));
        u.setRole(req.role);
        return usuarioRepo.save(u);
    }

    public Usuario updateUsername(Long id, String newUsername) {
        Usuario u = usuarioRepo.findById(id).orElseThrow();
        u.setUsername(newUsername);
        return usuarioRepo.save(u);
    }

    public void updatePassword(Long id, String newPassword) {
        Usuario u = usuarioRepo.findById(id).orElseThrow();
        u.setPassword(passwordEncoder.encode(newPassword));
        usuarioRepo.save(u);
    }

    public void delete(Long id) {
        usuarioRepo.deleteById(id);
    }
}


