import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavbarLocPage } from './navbar-loc.page';

const routes: Routes = [
  {
    path: '',
    component: NavbarLocPage,
    children: [
      {
        path: 'bienloc',
        loadChildren: () => import('../bienloc/bienloc.module').then( m => m.BienlocPageModule)
      },
      {
        path: 'requetes',
        loadChildren: () => import('../requetes/requetes.module').then( m => m.RequetesPageModule)
      },
      {
        path: 'profil-l',
        loadChildren: () => import('../profil-l/profil-l.module').then( m => m.ProfilLPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavbarLocPageRoutingModule {}
