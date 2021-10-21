import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuzannePage } from './suzanne.page';

const routes: Routes = [
  {
    path: '',
    component: SuzannePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuzannePageRoutingModule {}
