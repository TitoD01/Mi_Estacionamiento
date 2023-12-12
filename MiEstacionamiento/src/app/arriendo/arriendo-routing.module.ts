import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArriendoPage } from './arriendo.page';

const routes: Routes = [
  {
    path: '',
    component: ArriendoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArriendoPageRoutingModule {}
