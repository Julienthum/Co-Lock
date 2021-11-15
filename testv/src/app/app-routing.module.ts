import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'propriologin',
    loadChildren: () => import('./propriologin/propriologin.module').then( m => m.PropriologinPageModule)
  },
  {
    path: 'formuleproprio',
    loadChildren: () => import('./formuleproprio/formuleproprio.module').then( m => m.FormuleproprioPageModule)
  },
  {
    path: 'planproprio',
    loadChildren: () => import('./planproprio/planproprio.module').then( m => m.PlanproprioPageModule)
  },
  {
    path: 'slide',
    loadChildren: () => import('./slide/slide.module').then( m => m.SlidePageModule)
  },
  {
    path: 'monbien',
    loadChildren: () => import('./monbien/monbien.module').then( m => m.MonbienPageModule)
  },
  {
    path: 'suzanne',
    loadChildren: () => import('./suzanne/suzanne.module').then( m => m.SuzannePageModule)
  },
  {
    path: 'mesbiens',
    loadChildren: () => import('./mesbiens/mesbiens.module').then( m => m.MesbiensPageModule)
  },
  {
    path: 'biens',
    loadChildren: () => import('./biens/biens.module').then( m => m.BiensPageModule)
  },
  {
    path: 'locatairelogin',
    loadChildren: () => import('./locatairelogin/locatairelogin.module').then( m => m.LocataireloginPageModule)
  },
  {
    path: 'profil-p',
    loadChildren: () => import('./profil-p/profil-p.module').then( m => m.ProfilPPageModule)
  },


  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
