import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequeteinfoPage } from './requeteinfo.page';

const routes: Routes = [
  {
    path: '',
    component: RequeteinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequeteinfoPageRoutingModule {}
