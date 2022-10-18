import { Component, OnInit } from "@angular/core";
import { Recipe } from "src/app/models/recipe.model";
import { RecipeService } from "src/app/service/recipe.service";
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  currentRecipe: Recipe;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.currentRecipe = recipe;
      }
    );
  }
}
