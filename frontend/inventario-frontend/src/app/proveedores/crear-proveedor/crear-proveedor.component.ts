import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProveedorService } from '../../services/proveedor.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-proveedor',
  standalone: true,
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './crear-proveedor.component.html',
  styleUrls: ['./crear-proveedor.component.css']
})
export class CrearProveedorComponent {

  proveedor = {
    nombre: '',
    contacto: ''
  };

  constructor(
    private proveedorService: ProveedorService,
    private router: Router
  ) {}

  crear() {
    this.proveedorService.create(this.proveedor).subscribe(() => {
      this.router.navigate(['/proveedores']);
    });
  }

  volver() {
    this.router.navigate(['/proveedores']);
  }
}
