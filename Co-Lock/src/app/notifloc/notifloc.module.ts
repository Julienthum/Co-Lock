import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotiflocPageRoutingModule } from './notifloc-routing.module';

import { NotiflocPage } from './notifloc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotiflocPageRoutingModule
  ],
  declarations: [NotiflocPage]
})
export class NotiflocPageModule {}
