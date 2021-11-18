import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormuleproprioPageRoutingModule } from './formuleproprio-routing.module';

import { FormuleproprioPage } from './formuleproprio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormuleproprioPageRoutingModule
  ],
  declarations: [FormuleproprioPage]
})
export class FormuleproprioPageModule {}
