import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpLocatairePageRoutingModule } from './sign-up-locataire-routing.module';

import { SignUpLocatairePage } from './sign-up-locataire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpLocatairePageRoutingModule
  ],
  declarations: [SignUpLocatairePage]
})
export class SignUpLocatairePageModule {}
