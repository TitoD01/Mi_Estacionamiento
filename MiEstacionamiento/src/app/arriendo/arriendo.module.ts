import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArriendoPageRoutingModule } from './arriendo-routing.module';

import { ArriendoPage } from './arriendo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArriendoPageRoutingModule
  ],
  declarations: [ArriendoPage]
})
export class ArriendoPageModule {}
