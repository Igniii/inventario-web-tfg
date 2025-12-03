import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService, Proveedor } from '../../services/proveedor.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-proveedor',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './editar-proveedor.component.html',
  styleUrls: ['./editar-proveedor.component.css']
})
export class EditarProveedorComponent implements OnInit {

 proveedor: Proveedor = { nombre: '', contacto: '' };  // <-- FIX
   id!: number;

  constructor(
    private route: ActivatedRoute,
    private proveedorService: ProveedorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.proveedorService.getById(this.id).subscribe({
      next: (data) => this.proveedor = data,
      error: (err) => console.error('Error cargando proveedor', err)
    });
  }

  guardar() {
    this.proveedorService.update(this.id, this.proveedor).subscribe({
      next: () => this.router.navigate(['/proveedores']),
      error: (err) => console.error('Error actualizando proveedor', err)
    });
  }

    volver() {
      this.router.navigate(['/proveedores']);
    }
}
