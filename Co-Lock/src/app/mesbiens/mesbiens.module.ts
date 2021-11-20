import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesbiensPageRoutingModule } from './mesbiens-routing.module';

import { MesbiensPage } from './mesbiens.page';

import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesbiensPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MesbiensPage]
})
export class MesbiensPageModule {}
