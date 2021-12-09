import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanproprioPage } from './planproprio.page';

const routes: Routes = [
  {
    path: '',
    component: PlanproprioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanproprioPageRoutingModule {}
