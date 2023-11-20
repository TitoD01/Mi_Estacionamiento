import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegvehiculoPageRoutingModule } from './regvehiculo-routing.module';

import { RegvehiculoPage } from './regvehiculo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegvehiculoPageRoutingModule
  ],
  declarations: [RegvehiculoPage]
})
export class RegvehiculoPageModule {}
