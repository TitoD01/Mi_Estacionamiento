import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegvehiculoPage } from './regvehiculo.page';

const routes: Routes = [
  {
    path: '',
    component: RegvehiculoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegvehiculoPageRoutingModule {}
