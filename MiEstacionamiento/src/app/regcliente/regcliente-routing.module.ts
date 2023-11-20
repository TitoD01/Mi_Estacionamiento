import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegclientePage } from './regcliente.page';

const routes: Routes = [
  {
    path: '',
    component: RegclientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegclientePageRoutingModule {}
