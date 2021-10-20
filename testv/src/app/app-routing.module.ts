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
  },  {
    path: 'slide',
    loadChildren: () => import('./slide/slide.module').then( m => m.SlidePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
