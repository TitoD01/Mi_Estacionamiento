import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RegestacionamientoPageRoutingModule } from './regestacionamiento-routing.module';

import { RegestacionamientoPage } from './regestacionamiento.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RegestacionamientoPageRoutingModule
  ],
  declarations: [RegestacionamientoPage]
})
export class RegestacionamientoPageModule {}
