import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfolocPage } from './infoloc.page';

const routes: Routes = [
  {
    path: '',
    component: InfolocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfolocPageRoutingModule {}
