import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequetePageRoutingModule } from './requete-routing.module';

import { RequetePage } from './requete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequetePageRoutingModule
  ],
  declarations: [RequetePage]
})
export class RequetePageModule {}
