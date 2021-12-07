import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilinfoPageRoutingModule } from './profilinfo-routing.module';

import { ProfilinfoPage } from './profilinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProfilinfoPageRoutingModule
  ],
  declarations: [ProfilinfoPage]
})
export class ProfilinfoPageModule {}
