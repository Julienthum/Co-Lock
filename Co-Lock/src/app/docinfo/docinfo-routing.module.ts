import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocinfoPage } from './docinfo.page';

const routes: Routes = [
  {
    path: '',
    component: DocinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocinfoPageRoutingModule {}
