import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ProveedorService, Proveedor } from '../services/proveedor.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './proveedores.component.html'
})
export class ProveedoresComponent implements OnInit {

  proveedores: Proveedor[] = [];
  displayedColumns: string[] = ['nombre', 'contacto'];

  constructor(
    private proveedorService: ProveedorService,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit() {
    // Agregar columna de acciones para admins
    if (this.auth.isAdmin()) {
      this.displayedColumns.push('acciones');
    }

    this.loadProveedores();
  }

  loadProveedores() {
    this.proveedorService.getAll().subscribe({
      next: data => this.proveedores = data,
      error: err => console.error('Error al cargar proveedores:', err)
    });
  }

  editar(id: number) {
    this.router.navigate(['/proveedores/editar', id]);
  }

  eliminar(id: number) {
    if (!confirm('¿Seguro que deseas eliminar este proveedor?')) return;

    this.proveedorService.delete(id).subscribe({
      next: () => this.loadProveedores(),
      error: err => console.error('Error al eliminar proveedor:', err)
    });
  }
}
