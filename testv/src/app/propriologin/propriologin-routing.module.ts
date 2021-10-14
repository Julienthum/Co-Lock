import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropriologinPage } from './propriologin.page';

const routes: Routes = [
  {
    path: '',
    component: PropriologinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropriologinPageRoutingModule {}
