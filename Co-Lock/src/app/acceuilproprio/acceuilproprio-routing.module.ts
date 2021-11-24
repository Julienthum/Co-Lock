import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcceuilproprioPage } from './acceuilproprio.page';

const routes: Routes = [
  {
    path: '',
    component: AcceuilproprioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcceuilproprioPageRoutingModule {}
