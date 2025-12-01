import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProveedorService } from '../../services/proveedor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-proveedor',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-proveedor.component.html'
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
}
