import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginLocatairePage } from './login-locataire.page';

const routes: Routes = [
  {
    path: '',
    component: LoginLocatairePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginLocatairePageRoutingModule {}
