import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpPropioPage } from './sign-up-propio.page';

const routes: Routes = [
  {
    path: '',
    component: SignUpPropioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpPropioPageRoutingModule {}
