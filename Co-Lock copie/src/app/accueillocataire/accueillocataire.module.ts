import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccueillocatairePageRoutingModule } from './accueillocataire-routing.module';

import { AccueillocatairePage } from './accueillocataire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccueillocatairePageRoutingModule
  ],
  declarations: [AccueillocatairePage]
})
export class AccueillocatairePageModule {}
