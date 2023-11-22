import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegduenoPageRoutingModule } from './regdueno-routing.module';

import { RegduenoPage } from './regdueno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegduenoPageRoutingModule
  ],
  declarations: [RegduenoPage]
})
export class RegduenoPageModule {}
