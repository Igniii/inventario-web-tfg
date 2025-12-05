import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InventoryService } from './services/inventory.service';
import { NavbarComponent } from './navbar/navbar.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService.health().subscribe({
      next: (res) => console.log("Respuesta del backend:", res),
      error: (err) => console.error("Error llamando al backend:", err)
    });
  }
}
