import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BienlocPage } from './bienloc.page';

const routes: Routes = [
  {
    path: '',
    component: BienlocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BienlocPageRoutingModule {}
