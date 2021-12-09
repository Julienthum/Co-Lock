import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpLocatairePage } from './sign-up-locataire.page';

const routes: Routes = [
  {
    path: '',
    component: SignUpLocatairePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpLocatairePageRoutingModule {}
