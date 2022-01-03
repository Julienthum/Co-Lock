import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateBiensPage } from './update-biens.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateBiensPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateBiensPageRoutingModule {}
