import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiensarchivePageRoutingModule } from './biensarchive-routing.module';

import { BiensarchivePage } from './biensarchive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BiensarchivePageRoutingModule
  ],
  declarations: [BiensarchivePage]
})
export class BiensarchivePageModule {}
