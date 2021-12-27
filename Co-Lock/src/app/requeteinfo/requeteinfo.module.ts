import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequeteinfoPageRoutingModule } from './requeteinfo-routing.module';

import { RequeteinfoPage } from './requeteinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequeteinfoPageRoutingModule
  ],
  declarations: [RequeteinfoPage]
})
export class RequeteinfoPageModule {}
