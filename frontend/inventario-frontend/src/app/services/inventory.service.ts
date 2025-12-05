import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  health() {
    return this.http.get(`${this.apiUrl}/health`, { responseType: 'text' });
  }
}
