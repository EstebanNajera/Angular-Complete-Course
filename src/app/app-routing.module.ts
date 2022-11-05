import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'recipes', loadChildren: () => import('./modules/recipes/recipes.module').then(rm => rm.RecipesModule) },
  { path: 'shopping-list', loadChildren: () => import('./modules/shopping-list/shopping-list.module').then(slm => slm.ShoppingListModule) },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(am => am.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
