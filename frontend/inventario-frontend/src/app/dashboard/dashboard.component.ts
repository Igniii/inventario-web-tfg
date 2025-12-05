import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    RouterModule,
    MatChipsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalInventario = 0;
  totalProductos = 0;
  movimientosHoy = 0;

  criticos: any[] = [];
  loadingCriticos = false;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {

    // cargar estadísticas
    this.dashboardService.getStats().subscribe(stats => {
      this.totalInventario = stats.totalInventario;
      this.totalProductos = stats.totalProductos;
      this.movimientosHoy = stats.movimientosHoy;
    });

    // cargar productos críticos
    this.loadCriticos();
  }

  loadCriticos() {
    console.log("Solicitando productos críticos...");

    this.loadingCriticos = true;
    this.dashboardService.getCriticos().subscribe({
      next: (list) => {
        console.log("CRÍTICOS RECIBIDOS =>", list);
        this.criticos = list;
        this.loadingCriticos = false;
      },
      error: (err) => {
        console.error("Error cargando críticos", err);
        this.criticos = [];
        this.loadingCriticos = false;
      }
    });
  }
}
