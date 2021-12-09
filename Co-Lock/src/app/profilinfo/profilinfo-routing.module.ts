import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilinfoPage } from './profilinfo.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilinfoPageRoutingModule {}
