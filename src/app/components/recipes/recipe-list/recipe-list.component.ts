import { Component, Output, EventEmitter } from "@angular/core";
import { Recipe } from "src/app/models/recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  @Output() selectedRecipe: EventEmitter<Recipe> =  new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'Pasta',
      'Italian pasta',
      'https://www.cucinabyelena.com/wp-content/uploads/2022/01/0Z4A3605-3-scaled.jpg'
    ),
    new Recipe(
      'Pasta 2',
      'Italian pasta',
      'https://www.cucinabyelena.com/wp-content/uploads/2022/01/0Z4A3605-3-scaled.jpg'
    ),
  ];

  constructor() {}

  onLoadData(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
  }
}
