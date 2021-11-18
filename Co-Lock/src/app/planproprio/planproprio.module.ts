import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanproprioPageRoutingModule } from './planproprio-routing.module';

import { PlanproprioPage } from './planproprio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanproprioPageRoutingModule
  ],
  declarations: [PlanproprioPage]
})
export class PlanproprioPageModule {}
