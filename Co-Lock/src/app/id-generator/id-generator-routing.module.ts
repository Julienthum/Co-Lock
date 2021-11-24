import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdGeneratorPage } from './id-generator.page';

const routes: Routes = [
  {
    path: '',
    component: IdGeneratorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdGeneratorPageRoutingModule {}
