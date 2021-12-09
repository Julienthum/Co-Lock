import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcceuilproprioPageRoutingModule } from './acceuilproprio-routing.module';

import { AcceuilproprioPage } from './acceuilproprio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcceuilproprioPageRoutingModule
  ],
  declarations: [AcceuilproprioPage]
})
export class AcceuilproprioPageModule {}
