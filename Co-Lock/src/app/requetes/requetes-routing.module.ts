import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequetesPage } from './requetes.page';

const routes: Routes = [
  {
    path: '',
    component: RequetesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequetesPageRoutingModule {}
