import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnexionPagePage } from './connexion-page.page';

const routes: Routes = [
  {
    path: '',
    component: ConnexionPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnexionPagePageRoutingModule {}
