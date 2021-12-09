import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaintePageRoutingModule } from './plainte-routing.module';

import { PlaintePage } from './plainte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaintePageRoutingModule
  ],
  declarations: [PlaintePage]
})
export class PlaintePageModule {}
