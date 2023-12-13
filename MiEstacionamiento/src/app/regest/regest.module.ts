import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RegestPageRoutingModule } from './regest-routing.module';

import { RegestPage } from './regest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegestPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [RegestPage]
})
export class RegestPageModule {}
