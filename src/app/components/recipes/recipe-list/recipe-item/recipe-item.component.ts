import { Component, Input } from "@angular/core";
import { Recipe } from "src/app/models/recipe.model";
import { RecipeService } from "src/app/service/recipe.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) {}

  loadData() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
