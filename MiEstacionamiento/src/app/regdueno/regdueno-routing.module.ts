import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegduenoPage } from './regdueno.page';

const routes: Routes = [
  {
    path: '',
    component: RegduenoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegduenoPageRoutingModule {}
