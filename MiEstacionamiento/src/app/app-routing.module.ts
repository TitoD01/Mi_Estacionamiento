import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'menuregister',
    loadChildren: () => import('./menuregister/menuregister.module').then( m => m.MenuregisterPageModule)
  },
  {
    path: 'regcliente',
    loadChildren: () => import('./regcliente/regcliente.module').then( m => m.RegclientePageModule)
  },
  {
    path: 'regvehiculo',
    loadChildren: () => import('./regvehiculo/regvehiculo.module').then( m => m.RegvehiculoPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'regdueno',
    loadChildren: () => import('./regdueno/regdueno.module').then( m => m.RegduenoPageModule)
  },
  {
    path: 'regestacionamiento',
    loadChildren: () => import('./regestacionamiento/regestacionamiento.module').then( m => m.RegestacionamientoPageModule)
  },
  {
    path: 'arriendo',
    loadChildren: () => import('./arriendo/arriendo.module').then( m => m.ArriendoPageModule)
  },
  {
    path: 'pago',
    loadChildren: () => import('./pago/pago.module').then( m => m.PagoPageModule)
  },
  {
    path: 'formulario',
    loadChildren: () => import('./formulario/formulario.module').then( m => m.FormularioPageModule)
  },  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'regest',
    loadChildren: () => import('./regest/regest.module').then( m => m.RegestPageModule)
  },
  {
    path: 'regvehi',
    loadChildren: () => import('./regvehi/regvehi.module').then( m => m.RegvehiPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
