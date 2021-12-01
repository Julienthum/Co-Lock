import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocbiensPageRoutingModule } from './docbiens-routing.module';

import { DocbiensPage } from './docbiens.page';

import { ComponentsModule } from '../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocbiensPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  declarations: [DocbiensPage]
})
export class DocbiensPageModule {}
