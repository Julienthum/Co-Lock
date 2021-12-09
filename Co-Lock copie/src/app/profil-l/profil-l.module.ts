import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilLPageRoutingModule } from './profil-l-routing.module';

import { ProfilLPage } from './profil-l.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilLPageRoutingModule
  ],
  declarations: [ProfilLPage]
})
export class ProfilLPageModule {}
