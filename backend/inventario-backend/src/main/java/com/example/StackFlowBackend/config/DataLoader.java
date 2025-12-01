package com.example.StackFlowBackend.config;

import com.example.StackFlowBackend.model.Usuario;
import com.example.StackFlowBackend.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initUsers(UsuarioRepository repo) {
        return args -> {

            if (repo.findByUsername("admin").isEmpty()) {
                System.out.println("Creando usuario admin...");

                BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

                Usuario admin = new Usuario(
                        "admin",
                        encoder.encode("admin123"), // CONTRASEÑA
                        "ADMIN"
                );

                repo.save(admin);

                System.out.println("Usuario admin creado!");
            }
        };
    }
}
