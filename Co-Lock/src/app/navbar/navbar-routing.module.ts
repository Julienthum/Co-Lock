import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavbarPage } from './navbar.page';

const routes: Routes = [
  {
    path: '',
    component: NavbarPage,
    children: [
      {
        path: 'acceuil',
        loadChildren: () => import('../acceuil/acceuil.module').then( m => m.AcceuilPageModule)
      },
      {
        path: 'mesbiens',
        loadChildren: () => import('../mesbiens/mesbiens.module').then( m => m.MesbiensPageModule)
      },
      {
        path: 'docbiens',
        loadChildren: () => import('../docbiens/docbiens.module').then( m => m.DocbiensPageModule)
      },
      {
        path: 'profil-p',
        loadChildren: () => import('../profil-p/profil-p.module').then( m => m.ProfilPPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavbarPageRoutingModule {}
