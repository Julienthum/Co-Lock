import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjoutbienPageRoutingModule } from './ajoutbien-routing.module';

import { AjoutbienPage } from './ajoutbien.page';

import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    AjoutbienPageRoutingModule
  ],
  declarations: [AjoutbienPage]
})
export class AjoutbienPageModule {}
