import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocinfoPageRoutingModule } from './docinfo-routing.module';

import { DocinfoPage } from './docinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DocinfoPageRoutingModule
  ],
  declarations: [DocinfoPage]
})
export class DocinfoPageModule {}
