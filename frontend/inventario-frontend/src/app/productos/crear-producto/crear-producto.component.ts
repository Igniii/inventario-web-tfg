import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaService, Categoria } from '../../services/categoria.service';
import { ProveedorService, Proveedor } from '../../services/proveedor.service';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-producto.component.html'
})
export class CrearProductoComponent implements OnInit {

  categorias: Categoria[] = [];
  proveedores: Proveedor[] = [];

  producto = {
    nombre: '',
    descripcion: '',
    stock: 0,
    precio: 0,
    categoriaId: null as number | null,
    proveedorId: null as number | null
  };

  constructor(
    private categoriaService: CategoriaService,
    private proveedorService: ProveedorService,
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit() {

    // Cargar categorías
    this.categoriaService.getAll().subscribe({
      next: data => this.categorias = data,
      error: err => console.error('Error cargando categorías', err)
    });

    // Cargar proveedores
    this.proveedorService.getAll().subscribe({
      next: data => this.proveedores = data,
      error: err => console.error('Error cargando proveedores', err)
    });
  }

  crearProducto() {

    const body = {
      nombre: this.producto.nombre,
      descripcion: this.producto.descripcion,
      stock: this.producto.stock,
      precio: this.producto.precio,
      categoria: this.producto.categoriaId ? { id: this.producto.categoriaId } : undefined,
      proveedor: this.producto.proveedorId ? { id: this.producto.proveedorId } : undefined
    };

    this.productoService.crearProducto(body).subscribe({
      next: () => this.router.navigate(['/productos']),
      error: err => console.error('Error creando producto', err)
    });
  }
}
