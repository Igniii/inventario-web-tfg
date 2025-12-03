import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsuarioService, Usuario } from '../services/usuario.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatTableModule, MatButtonModule,
    MatFormFieldModule, MatInputModule
  ],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  displayedColumns = ['id', 'username', 'role', 'acciones'];
  usuarios: Usuario[] = [];

  nuevoUsuario = {
    username: '',
    password: '',
    role: 'USER'
  };

  currentUser: string | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.auth.getUsername();
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.getAll().subscribe(data => this.usuarios = data);
  }

  crearUsuario() {
    this.usuarioService.create(this.nuevoUsuario).subscribe(() => {
      this.cargarUsuarios();
      this.nuevoUsuario = { username: '', password: '', role: 'USER' };
    });
  }

  cambiarNombre(id: number, username: string) {
    this.usuarioService.updateUsername(id, username).subscribe(() => this.cargarUsuarios());
  }

  cambiarPasswordUI(id: number) {
    const nueva = window.prompt("Nueva contraseña:");
    if (!nueva || nueva.trim() === "") return;

    this.cambiarPassword(id, nueva);
  }

  cambiarPassword(id: number, password: string) {
    this.usuarioService.updatePassword(id, password).subscribe(() => {
      this.cargarUsuarios();
    });
  }

  eliminar(id: number) {
    this.usuarioService.delete(id).subscribe(() => this.cargarUsuarios());
  }
}
