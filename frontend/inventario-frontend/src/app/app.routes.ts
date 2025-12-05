import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth/auth.guard';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { RegisterComponent } from './auth/register/register.component';
import { adminGuard } from './auth/admin.guard';
import { noAuthGuard } from './auth/no-auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [noAuthGuard] },

  { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },

  { path: 'productos',
  component: ProductosComponent, canActivate: [authGuard] },

  { path: 'productos/crear',
  component: CrearProductoComponent,
  canActivate: [authGuard, adminGuard]

  },
{ path: 'dashboard',
component: DashboardComponent,
canActivate: [authGuard] },

  {
    path: 'categorias',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./categorias/categorias.component')
        .then(m => m.CategoriasComponent)
  },

  {
    path: 'categorias/crear',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./categorias/crear-categoria/crear-categoria.component')
        .then(m => m.CrearCategoriaComponent)
  },

  {
    path: 'categorias/editar/:id',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./categorias/editar-categoria/editar-categoria.component')
        .then(m => m.EditarCategoriaComponent)
  },
{
  path: 'register',
  canActivate: [noAuthGuard],
  loadComponent: () =>
    import('./auth/register/register.component')
    .then(m => m.RegisterComponent)
},
{
  path: 'proveedores',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./proveedores/proveedores.component')
      .then(m => m.ProveedoresComponent)
},
{
  path: 'proveedores/crear',
  canActivate: [authGuard, adminGuard],
  loadComponent: () =>
    import('./proveedores/crear-proveedor/crear-proveedor.component')
      .then(m => m.CrearProveedorComponent)
},
{
  path: 'proveedores/editar/:id',
  canActivate: [authGuard],      // o adminGuard si solo admin puede editar
  loadComponent: () =>
    import('./proveedores/editar-proveedor/editar-proveedor.component')
      .then(m => m.EditarProveedorComponent)
},
{
  path: 'productos/editar/:id',
  loadComponent: () =>
    import('./productos/editar-producto/editar-producto.component')
      .then(m => m.EditarProductoComponent)
},
{
  path: 'movimientos',
  loadComponent: () =>
    import('./movimientos/movimientos.component')
    .then(m => m.MovimientosComponent)
},

{
  path: 'movimientos/entrada',
  loadComponent: () =>
    import('./movimientos/crear-movimiento/crear-movimiento.component')
      .then(m => m.CrearMovimientoComponent)
},
{
  path: 'movimientos/salida',
  loadComponent: () =>
    import('./movimientos/crear-movimiento/crear-movimiento.component')
      .then(m => m.CrearMovimientoComponent)
},
{
path: 'admin-panel',
canActivate: [authGuard, adminGuard],
loadComponent: () =>
  import('./admin-panel/admin-panel.component')
    .then(m => m.AdminPanelComponent)
    },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component')
        .then(m => m.NotFoundComponent)
  }





];
