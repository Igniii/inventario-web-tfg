package com.example.StackFlowBackend.controller;

import com.example.StackFlowBackend.dto.*;
import com.example.StackFlowBackend.model.Usuario;
import com.example.StackFlowBackend.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @GetMapping
    public List<Usuario> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Usuario create(@RequestBody UserRequest req) {
        return service.create(req);
    }

    @PutMapping("/{id}")
    public Usuario updateUsername(@PathVariable Long id, @RequestBody UpdateUsernameRequest req) {
        return service.updateUsername(id, req.username);
    }

    @PutMapping("/{id}/password")
    public void updatePassword(@PathVariable Long id, @RequestBody UpdatePasswordRequest req) {
        service.updatePassword(id, req.password);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
