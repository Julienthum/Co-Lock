import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjoutbienPage } from './ajoutbien.page';

const routes: Routes = [
  {
    path: '',
    component: AjoutbienPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjoutbienPageRoutingModule {}
