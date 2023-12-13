import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegestPage } from './regest.page';

const routes: Routes = [
  {
    path: '',
    component: RegestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegestPageRoutingModule {}
