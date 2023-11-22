import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegestacionamientoPage } from './regestacionamiento.page';

const routes: Routes = [
  {
    path: '',
    component: RegestacionamientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegestacionamientoPageRoutingModule {}
