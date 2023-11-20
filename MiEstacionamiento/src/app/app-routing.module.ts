import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },  {
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

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
