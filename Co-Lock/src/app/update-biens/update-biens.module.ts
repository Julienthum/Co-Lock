import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateBiensPageRoutingModule } from './update-biens-routing.module';

import { UpdateBiensPage } from './update-biens.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateBiensPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdateBiensPage]
})
export class UpdateBiensPageModule {}
