import { Component } from "@angular/core";
import { Recipe } from "src/app/models/recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe(
      'Pasta',
      'Italian pasta',
      'https://www.cucinabyelena.com/wp-content/uploads/2022/01/0Z4A3605-3-scaled.jpg'
    ),
    new Recipe(
      'Pasta',
      'Italian pasta',
      'https://www.cucinabyelena.com/wp-content/uploads/2022/01/0Z4A3605-3-scaled.jpg'
    ),
  ];
}
