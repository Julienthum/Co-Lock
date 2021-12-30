import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocinfolocPageRoutingModule } from './docinfoloc-routing.module';

import { DocinfolocPage } from './docinfoloc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocinfolocPageRoutingModule
  ],
  declarations: [DocinfolocPage]
})
export class DocinfolocPageModule {}
