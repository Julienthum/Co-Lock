import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormuleproprioPage } from './formuleproprio.page';

const routes: Routes = [
  {
    path: '',
    component: FormuleproprioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormuleproprioPageRoutingModule {}
