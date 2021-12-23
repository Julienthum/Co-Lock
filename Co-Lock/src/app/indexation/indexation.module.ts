import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndexationPageRoutingModule } from './indexation-routing.module';

import { IndexationPage } from './indexation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndexationPageRoutingModule
  ],
  declarations: [IndexationPage]
})
export class IndexationPageModule {}
