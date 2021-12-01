import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequetesPageRoutingModule } from './requetes-routing.module';

import { RequetesPage } from './requetes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequetesPageRoutingModule
  ],
  declarations: [RequetesPage]
})
export class RequetesPageModule {}
