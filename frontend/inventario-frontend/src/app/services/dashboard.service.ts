import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private API_URL = `${environment.apiUrl}/api/dashboard`;
    private PRODUCTOS_URL = `${environment.apiUrl}/api/productos`;

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

  getCriticos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.PRODUCTOS_URL}/criticos`);

  }
}
