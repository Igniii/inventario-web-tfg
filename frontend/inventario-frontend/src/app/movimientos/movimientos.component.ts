import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MovimientoStockService, MovimientoStock } from '../services/movimiento-stock.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './movimientos.component.html'
})
export class MovimientosComponent implements OnInit {

  dataSource = new MatTableDataSource<MovimientoStock>([]);
  displayedColumns = ['fecha', 'producto', 'tipo', 'cantidad', 'nota'];

  constructor(
    private movimientoService: MovimientoStockService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.cargarMovimientos();
  }

  cargarMovimientos() {
    this.movimientoService.getAll().subscribe({
      next: data => this.dataSource.data = data,
      error: err => console.error(err)
    });
  }

  irEntrada() {
    this.router.navigate(['/movimientos/entrada']);
  }

  irSalida() {
    this.router.navigate(['/movimientos/salida']);
  }
}
