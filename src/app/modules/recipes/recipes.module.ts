import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { RecipeDetailComponent } from "src/app/components/recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "src/app/components/recipes/recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "src/app/components/recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "src/app/components/recipes/recipe-list/recipe-list.component";
import { RecipeStartComponent } from "src/app/components/recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "src/app/components/recipes/recipes.component";
import { SharedModule } from "../shared/shared.module";
import { RecipesRoutingModule } from "./recipes-routing.module";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    RouterModule,
    SharedModule, // da acceso a ng if y ng for, etc.
    ReactiveFormsModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule {}
