import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductoService, Producto } from '../../services/producto.service';
import { CategoriaService, Categoria } from '../../services/categoria.service';
import { ProveedorService, Proveedor } from '../../services/proveedor.service';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-producto.component.html'
})
export class EditarProductoComponent implements OnInit {

  categorias: Categoria[] = [];
  proveedores: Proveedor[] = [];

  producto: Producto = {
    id: 0,
    nombre: '',
    descripcion: '',
    stock: 0,
    precio: 0,
    categoria: null,
    proveedor: null
  };

  categoriaId: number | null = null;
  proveedorId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private proveedorService: ProveedorService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Cargar listas
    this.categoriaService.getAll().subscribe(data => this.categorias = data);
    this.proveedorService.getAll().subscribe(data => this.proveedores = data);

    // Cargar producto existente
    this.productoService.getById(id).subscribe(data => {
      this.producto = data;

      // Preseleccionar IDs
      this.categoriaId = data.categoria?.id ?? null;
      this.proveedorId = data.proveedor?.id ?? null;
    });
  }

  guardar() {
    if (!this.producto.id) return;

    const body: Producto = {
      id: this.producto.id,
      nombre: this.producto.nombre,
      descripcion: this.producto.descripcion,
      stock: this.producto.stock,
      precio: this.producto.precio,
      categoria: this.categoriaId ? { id: this.categoriaId } : undefined,
      proveedor: this.proveedorId ? { id: this.proveedorId } : undefined
    };

    this.productoService.update(this.producto.id, body).subscribe({
      next: () => this.router.navigate(['/productos']),
      error: err => console.error('Error actualizando producto', err)
    });
  }
}
