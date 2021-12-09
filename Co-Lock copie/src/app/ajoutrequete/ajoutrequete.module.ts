import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjoutrequetePageRoutingModule } from './ajoutrequete-routing.module';

import { AjoutrequetePage } from './ajoutrequete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjoutrequetePageRoutingModule
  ],
  declarations: [AjoutrequetePage]
})
export class AjoutrequetePageModule {}
