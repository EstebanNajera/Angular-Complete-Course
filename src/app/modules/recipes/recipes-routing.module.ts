import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailComponent } from "src/app/components/recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "src/app/components/recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "src/app/components/recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "src/app/components/recipes/recipes.component";
import { AuthGuard } from "src/app/service/guards/auth.guard";
import { RecipesResolverService } from "src/app/service/resolvers/recipes-resolver.service";

const routes: Routes = [
  { path: '', component: RecipesComponent, canActivate: [AuthGuard], children: [
    { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
    { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
