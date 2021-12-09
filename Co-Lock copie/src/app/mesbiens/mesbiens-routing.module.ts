import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesbiensPage } from './mesbiens.page';

const routes: Routes = [
  {
    path: '',
    component: MesbiensPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesbiensPageRoutingModule {}
