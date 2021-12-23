import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexationPage } from './indexation.page';

const routes: Routes = [
  {
    path: '',
    component: IndexationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexationPageRoutingModule {}
