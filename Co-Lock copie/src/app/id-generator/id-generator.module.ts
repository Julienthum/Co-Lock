import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdGeneratorPageRoutingModule } from './id-generator-routing.module';

import { IdGeneratorPage } from './id-generator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdGeneratorPageRoutingModule
  ],
  declarations: [IdGeneratorPage]
})
export class IdGeneratorPageModule {}
