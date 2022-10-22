import { Injectable } from "@angular/core";
import { Ingredient } from "../models/ingredient.model";
import { Recipe } from "../models/recipe.model";
import { ShoppingListService } from "./shopping-list.service";

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Pasta',
      'Italian pasta',
      'https://www.cucinabyelena.com/wp-content/uploads/2022/01/0Z4A3605-3-scaled.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe(
      'Pasta 2',
      'Italian pasta',
      'https://www.cucinabyelena.com/wp-content/uploads/2022/01/0Z4A3605-3-scaled.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]
    ),
  ];

  constructor(
    private shoppingListService: ShoppingListService
  ) {}

  public getRecipes() {
    return this.recipes.slice();
  }

  public getRecipe(id: number) {
    return this.recipes.slice()[id];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
