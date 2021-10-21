import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuzannePageRoutingModule } from './suzanne-routing.module';

import { SuzannePage } from './suzanne.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuzannePageRoutingModule
  ],
  declarations: [SuzannePage]
})
export class SuzannePageModule {}
