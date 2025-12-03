import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent {

  nombre: string = '';

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  crear() {
    this.categoriaService.create({ nombre: this.nombre }).subscribe({
      next: () => this.router.navigate(['/categorias']),
      error: (err) => console.error(err)
    });
  }

  volver() {
    this.router.navigate(['/categorias']);
  }
}
