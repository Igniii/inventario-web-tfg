package com.example.StackFlowBackend.controller;

import com.example.StackFlowBackend.dto.LoginRequest;
import com.example.StackFlowBackend.dto.LoginResponse;
import com.example.StackFlowBackend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        LoginResponse resp = authService.authenticate(request);
        if (resp == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
        return ResponseEntity.ok(resp);
    }
}
