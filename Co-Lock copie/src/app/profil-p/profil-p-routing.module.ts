import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilPPage } from './profil-p.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilPPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilPPageRoutingModule {}
