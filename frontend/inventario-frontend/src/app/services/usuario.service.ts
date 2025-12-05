import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Usuario {
  id: number;
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API_URL = `${environment.apiUrl}/api/usuarios`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Usuario[]>(this.API_URL);
  }

  create(data: { username: string; password: string; role: string }) {
    return this.http.post(this.API_URL, data);
  }

  updateUsername(id: number, username: string) {
    return this.http.put(`${this.API_URL}/${id}`, { username });
  }

  updatePassword(id: number, password: string) {
    return this.http.put(`${this.API_URL}/${id}/password`, { password });
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
