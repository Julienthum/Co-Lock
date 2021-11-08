import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocataireloginPageRoutingModule } from './locatairelogin-routing.module';

import { LocataireloginPage } from './locatairelogin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LocataireloginPageRoutingModule
  ],
  declarations: [LocataireloginPage]
})
export class LocataireloginPageModule {}
