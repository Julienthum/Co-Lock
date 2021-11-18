import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnexionPagePageRoutingModule } from './connexion-page-routing.module';

import { ConnexionPagePage } from './connexion-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConnexionPagePageRoutingModule
  ],
  declarations: [ConnexionPagePage]
})
export class ConnexionPagePageModule {}
