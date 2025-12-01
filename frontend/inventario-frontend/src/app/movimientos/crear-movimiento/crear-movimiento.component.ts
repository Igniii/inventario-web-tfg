import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { MovimientoStockService, MovimientoStock } from '../../services/movimiento-stock.service';
import { ProductoService, Producto } from '../../services/producto.service';

@Component({
  selector: 'app-crear-movimiento',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,    // <- añadir
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './crear-movimiento.component.html'
})
export class CrearMovimientoComponent implements OnInit {

  productos: Producto[] = [];

  tipo: 'ENTRADA' | 'SALIDA' = 'ENTRADA';

  movimiento: MovimientoStock = {
    producto: { id: 0 },
    cantidad: 0,
    tipo: 'ENTRADA',
    nota: ''
  };

  constructor(
    private productoService: ProductoService,
    private movimientoService: MovimientoStockService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Cargar productos
    this.productoService.getProductos().subscribe({
      next: data => this.productos = data,
      error: err => console.error(err)
    });

    // Determinar si estamos creando una ENTRADA o una SALIDA según la URL
    const url = this.router.url;

    if (url.includes('salida')) {
      this.tipo = 'SALIDA';
      this.movimiento.tipo = 'SALIDA';
    } else {
      this.tipo = 'ENTRADA';
      this.movimiento.tipo = 'ENTRADA';
    }

    // Producto seleccionado desde productos → ?productoId=XX
    const productoId = Number(this.route.snapshot.queryParamMap.get('productoId'));

    if (productoId) {
      this.movimiento.producto = { id: productoId };
    }
  }

  guardar() {

    // Entradas siempre positivas, salidas siempre negativas
    if (this.movimiento.tipo === 'SALIDA') {
      this.movimiento.cantidad = -Math.abs(this.movimiento.cantidad);
    } else {
      this.movimiento.cantidad = Math.abs(this.movimiento.cantidad);
    }

    this.movimientoService.crearMovimiento(this.movimiento).subscribe({
      next: () => this.router.navigate(['/movimientos']),
      error: err => console.error(err)
    });
  }
}
