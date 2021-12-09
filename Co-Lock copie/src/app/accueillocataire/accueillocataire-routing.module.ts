import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueillocatairePage } from './accueillocataire.page';

const routes: Routes = [
  {
    path: '',
    component: AccueillocatairePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccueillocatairePageRoutingModule {}
