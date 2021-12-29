import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfolocPageRoutingModule } from './infoloc-routing.module';

import { InfolocPage } from './infoloc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfolocPageRoutingModule
  ],
  declarations: [InfolocPage]
})
export class InfolocPageModule {}
