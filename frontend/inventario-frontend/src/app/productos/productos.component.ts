import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { ProductoService, Producto } from '../services/producto.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {

  dataSource = new MatTableDataSource<Producto>([]);
  displayedColumns: string[] = [];

  constructor(
    private productoService: ProductoService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.configurarColumnas();
    this.loadProductos();
  }

  configurarColumnas() {
    this.displayedColumns = [
      'nombre',
      'descripcion',
      'precio',
      'stock',
      'categoria',
      'proveedor'
    ];

    if (this.auth.isAdmin()) {
      this.displayedColumns.push('acciones');
    }
  }

  loadProductos() {
    this.productoService.getProductos().subscribe({
      next: data => this.dataSource.data = data,
      error: err => console.error(err)
    });
  }

  irCrear() {
    this.router.navigate(['/productos/crear']);
  }

  editar(id: number) {
    this.router.navigate(['/productos/editar', id]);
  }

  eliminarProducto(id: number) {
    if (!confirm('¿Seguro que quieres eliminar este producto?')) return;

    this.productoService.eliminarProducto(id).subscribe({
      next: () => this.loadProductos(),
      error: err => console.error(err)
    });
  }

  entradaStock(id: number) {
    this.router.navigate(['/movimientos/entrada'], {
      queryParams: { productoId: id }
    });
  }

  salidaStock(id: number) {
    this.router.navigate(['/movimientos/salida'], {
      queryParams: { productoId: id }
    });
  }
}
