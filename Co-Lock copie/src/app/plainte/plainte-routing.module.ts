import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaintePage } from './plainte.page';

const routes: Routes = [
  {
    path: '',
    component: PlaintePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaintePageRoutingModule {}
