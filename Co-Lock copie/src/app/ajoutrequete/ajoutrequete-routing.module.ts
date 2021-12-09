import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjoutrequetePage } from './ajoutrequete.page';

const routes: Routes = [
  {
    path: '',
    component: AjoutrequetePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjoutrequetePageRoutingModule {}
