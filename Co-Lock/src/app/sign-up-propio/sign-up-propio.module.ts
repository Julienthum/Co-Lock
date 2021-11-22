import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPropioPageRoutingModule } from './sign-up-propio-routing.module';

import { SignUpPropioPage } from './sign-up-propio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,  ReactiveFormsModule,

    SignUpPropioPageRoutingModule
  ],
  declarations: [SignUpPropioPage]
})
export class SignUpPropioPageModule {}
