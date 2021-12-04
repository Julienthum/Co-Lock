import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: 'acceuil',
        loadChildren: () => import('../../acceuil/acceuil.module').then( m => m.AcceuilPageModule)
      },
      {
        path: 'mesbiens',
        loadChildren: () => import('../../mesbiens/mesbiens.module').then( m => m.MesbiensPageModule)
      },
      {
        path: 'ajoutbien',
        loadChildren: () => import('../../ajoutbien/ajoutbien.module').then( m => m.AjoutbienPageModule)
      },
      {
        path: 'profil-p',
        loadChildren: () => import('../../profil-p/profil-p.module').then( m => m.ProfilPPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavbarPageRoutingModule {}
