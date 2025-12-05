import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './producto.service';
import { environment } from '../../environments/environment';

export interface MovimientoStock {
  id?: number;
  producto: Producto | { id: number };
  cantidad: number;
  fecha?: string;
  tipo: 'ENTRADA' | 'SALIDA';
  nota?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovimientoStockService {

  private apiUrl = `${environment.apiUrl}/api/movimientos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<MovimientoStock[]> {
    return this.http.get<MovimientoStock[]>(this.apiUrl);
  }

  crearMovimiento(mov: MovimientoStock): Observable<MovimientoStock> {
    return this.http.post<MovimientoStock>(this.apiUrl, mov);
  }
}
