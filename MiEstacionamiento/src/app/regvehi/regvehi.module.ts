import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegvehiPageRoutingModule } from './regvehi-routing.module';

import { RegvehiPage } from './regvehi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegvehiPageRoutingModule
  ],
  declarations: [RegvehiPage]
})
export class RegvehiPageModule {}
