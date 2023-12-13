import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegvehiPage } from './regvehi.page';

const routes: Routes = [
  {
    path: '',
    component: RegvehiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegvehiPageRoutingModule {}
