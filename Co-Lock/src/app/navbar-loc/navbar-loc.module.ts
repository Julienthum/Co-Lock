import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NavbarLocPageRoutingModule } from './navbar-loc-routing.module';

import { NavbarLocPage } from './navbar-loc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NavbarLocPageRoutingModule
  ],
  declarations: [NavbarLocPage]
})
export class NavbarLocPageModule {}
