import { Component } from "@angular/core";
import { Recipe } from "src/app/models/recipe.model";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  currentRecipe: Recipe;

  constructor() {}

  sendRecipeData(recipe: Recipe) {
    this.currentRecipe = recipe;
  }

}
