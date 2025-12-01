package com.example.StackFlowBackend.service;

import com.example.StackFlowBackend.model.Usuario;
import com.example.StackFlowBackend.repository.UsuarioRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioDetailsService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioDetailsService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario u = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        // Asegurar prefijo ROLE_
        String role = u.getRole();
        if (!role.startsWith("ROLE_")) {
            role = "ROLE_" + role;
        }

        List<SimpleGrantedAuthority> authorities =
                List.of(new SimpleGrantedAuthority(role));

        return new User(u.getUsername(), u.getPassword(), authorities);
    }
}
