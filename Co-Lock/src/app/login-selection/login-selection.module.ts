import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginSelectionPageRoutingModule } from './login-selection-routing.module';

import { LoginSelectionPage } from './login-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginSelectionPageRoutingModule
  ],
  declarations: [LoginSelectionPage]
})
export class LoginSelectionPageModule {}
