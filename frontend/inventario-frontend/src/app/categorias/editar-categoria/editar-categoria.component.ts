import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService, Categoria } from '../../services/categoria.service';

@Component({
  selector: 'app-editar-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {

  id!: number;
  categoria: Categoria = { nombre: '' };

  constructor(
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.categoriaService.getAll().subscribe({
      next: (list) => {
        const c = list.find(x => x.id === this.id);
        if (c) this.categoria = c;
      }
    });
  }

  guardar() {
    this.categoriaService.update(this.id, this.categoria).subscribe({
      next: () => this.router.navigate(['/categorias'])
    });
  }

  volver() {
    this.router.navigate(['/categorias']);
  }
}
