import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilLPage } from './profil-l.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilLPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilLPageRoutingModule {}
