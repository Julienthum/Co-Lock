import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilPPageRoutingModule } from './profil-p-routing.module';

import { ProfilPPage } from './profil-p.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilPPageRoutingModule
  ],
  declarations: [ProfilPPage]
})
export class ProfilPPageModule {}
