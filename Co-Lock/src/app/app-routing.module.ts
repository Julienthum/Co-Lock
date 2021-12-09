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
    path: 'connexion-page',
    loadChildren: () => import('./connexion-page/connexion-page.module').then( m => m.ConnexionPagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sign-up-propio',
    loadChildren: () => import('./sign-up-propio/sign-up-propio.module').then( m => m.SignUpPropioPageModule)
  },
  {
    path: 'sign-up-locataire',
    loadChildren: () => import('./sign-up-locataire/sign-up-locataire.module').then( m => m.SignUpLocatairePageModule)
  },
  {
    path: 'navbar',
    loadChildren: () => import('./navbar/navbar.module').then( m => m.NavbarPageModule)
  },
  {
    path: 'profil-p',
    loadChildren: () => import('./profil-p/profil-p.module').then( m => m.ProfilPPageModule)
  },
  {
    path: 'planproprio',
    loadChildren: () => import('./planproprio/planproprio.module').then( m => m.PlanproprioPageModule)
  },
  {
    path: 'monbien',
    loadChildren: () => import('./monbien/monbien.module').then( m => m.MonbienPageModule)
  },
  {
    path: 'mesbiens',
    loadChildren: () => import('./mesbiens/mesbiens.module').then( m => m.MesbiensPageModule)
  },
  {
    path: 'slide',
    loadChildren: () => import('./slide/slide.module').then( m => m.SlidePageModule)
  },
  {
    path: 'formuleproprio',
    loadChildren: () => import('./formuleproprio/formuleproprio.module').then( m => m.FormuleproprioPageModule)
  },
  {
    path: 'biens',
    loadChildren: () => import('./biens/biens.module').then( m => m.BiensPageModule)
  },
  {
    path: 'acceuil',
    loadChildren: () => import('./acceuil/acceuil.module').then( m => m.AcceuilPageModule)
  },
  {
    path: 'ajoutbien',
    loadChildren: () => import('./ajoutbien/ajoutbien.module').then( m => m.AjoutbienPageModule)
  },
  {
    path: 'acceuilproprio',
    loadChildren: () => import('./acceuilproprio/acceuilproprio.module').then( m => m.AcceuilproprioPageModule)
  },
  {
    path: 'profil-l',
    loadChildren: () => import('./profil-l/profil-l.module').then( m => m.ProfilLPageModule)
  },
  {
    path: 'id-generator',
    loadChildren: () => import('./id-generator/id-generator.module').then( m => m.IdGeneratorPageModule)
  },
  {
    path: 'accueillocataire',
    loadChildren: () => import('./accueillocataire/accueillocataire.module').then( m => m.AccueillocatairePageModule)
  },
  {
    path: 'monbien/:id',
    loadChildren: () =>
      import('./monbien/monbien.module').then(
        (m) => m.MonbienPageModule
      ),
  },
  {
    path: 'docbiens',
    loadChildren: () => import('./docbiens/docbiens.module').then( m => m.DocbiensPageModule)
  },
  {
    path: 'requetes',
    loadChildren: () => import('./requetes/requetes.module').then( m => m.RequetesPageModule)
  },
  {
    path: 'profilinfo',
    loadChildren: () => import('./profilinfo/profilinfo.module').then( m => m.ProfilinfoPageModule)
  },
  {
    path: 'bienloc',
    loadChildren: () => import('./bienloc/bienloc.module').then( m => m.BienlocPageModule)
  },
  {
    path: 'navbar-loc',
    loadChildren: () => import('./navbar-loc/navbar-loc.module').then( m => m.NavbarLocPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
