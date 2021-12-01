import { NgModule } from '@angular/core';
import {NavbarComponent} from './navbar/navbar.component';
import { DocpreviewdComponent } from './docpreviewd/docpreviewd.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    NavbarComponent,
    DocpreviewdComponent
  ],
  exports: [
    NavbarComponent,
    DocpreviewdComponent
  ],
  imports: [CommonModule, IonicModule],
})

export class ComponentsModule{}
