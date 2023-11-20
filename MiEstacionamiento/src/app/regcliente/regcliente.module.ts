import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegclientePageRoutingModule } from './regcliente-routing.module';

import { RegclientePage } from './regcliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegclientePageRoutingModule
  ],
  declarations: [RegclientePage]
})
export class RegclientePageModule {}
