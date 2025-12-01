import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { CategoriaService, Categoria } from '../services/categoria.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './categorias.component.html'
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[] = [];
  displayedColumns: string[] = ['nombre'];

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit() {
    if (this.auth.isAdmin()) {
      this.displayedColumns.push('acciones');
    }
    this.loadCategorias();
  }

  loadCategorias() {
    this.categoriaService.getAll().subscribe({
      next: data => this.categorias = data,
      error: err => console.error(err)
    });
  }

  irCrear() {
    this.router.navigate(['/categorias/crear']);
  }

  editar(id: number) {
    this.router.navigate(['/categorias/editar', id]);
  }

  eliminar(id: number) {
    if (!confirm('¿Seguro que quieres eliminar esta categoría?')) return;

    this.categoriaService.delete(id).subscribe({
      next: () => this.loadCategorias(),
      error: err => console.error(err)
    });
  }
}
