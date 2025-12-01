import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private API_URL = 'http://localhost:8080/api/dashboard';

  constructor(private http: HttpClient) {}

  getStats(): Observable<{
    totalInventario: number;
    totalProductos: number;
    movimientosHoy: number;
  }> {
    return this.http.get<{
      totalInventario: number;
      totalProductos: number;
      movimientosHoy: number;
    }>(`${this.API_URL}/stats`);
  }
}
