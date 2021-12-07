import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BienlocPageRoutingModule } from './bienloc-routing.module';

import { BienlocPage } from './bienloc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BienlocPageRoutingModule
  ],
  declarations: [BienlocPage]
})
export class BienlocPageModule {}
