import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PropriologinPageRoutingModule } from './propriologin-routing.module';

import { PropriologinPage } from './propriologin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropriologinPageRoutingModule
  ],
  declarations: [PropriologinPage]
})
export class PropriologinPageModule {}
