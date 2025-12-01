package com.example.StackFlowBackend.service;

import com.example.StackFlowBackend.dto.LoginRequest;
import com.example.StackFlowBackend.dto.LoginResponse;
import com.example.StackFlowBackend.model.Usuario;
import com.example.StackFlowBackend.repository.UsuarioRepository;
import com.example.StackFlowBackend.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UsuarioRepository usuarioRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse authenticate(LoginRequest req) {

        Optional<Usuario> userOpt = usuarioRepository.findByUsername(req.getUsername());
        if (userOpt.isEmpty()) {
            return null;
        }

        Usuario user = userOpt.get();

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            return null;
        }

        // Generar JWT
        String token = jwtService.generateToken(user);



        return new LoginResponse(token);
    }

    public void register(String username, String password) {

        if (username == null || username.isBlank() ||
                password == null || password.isBlank()) {
            throw new IllegalArgumentException("Se necesita usuario y contraseña");
        }

        if (usuarioRepository.findByUsername(username).isPresent()) {
            throw new IllegalArgumentException("El nombre de usuario ya existe");
        }

        Usuario u = new Usuario();
        u.setUsername(username);
        u.setRole("USER");
        u.setPassword(passwordEncoder.encode(password));
        usuarioRepository.save(u);
    }

}
