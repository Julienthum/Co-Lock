import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocbiensPage } from './docbiens.page';

const routes: Routes = [
  {
    path: '',
    component: DocbiensPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocbiensPageRoutingModule {}
