import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuregisterPage } from './menuregister.page';

const routes: Routes = [
  {
    path: '',
    component: MenuregisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuregisterPageRoutingModule {}
