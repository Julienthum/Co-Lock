import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonbienPageRoutingModule } from './monbien-routing.module';

import { MonbienPage } from './monbien.page';

import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    MonbienPageRoutingModule
  ],
  exports: [MonbienPage],
  declarations: [MonbienPage]
})
export class MonbienPageModule {}
