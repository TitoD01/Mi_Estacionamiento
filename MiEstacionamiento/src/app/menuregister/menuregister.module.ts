import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuregisterPageRoutingModule } from './menuregister-routing.module';

import { MenuregisterPage } from './menuregister.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuregisterPageRoutingModule
  ],
  declarations: [MenuregisterPage]
})
export class MenuregisterPageModule {}
