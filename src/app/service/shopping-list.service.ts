import { EventEmitter } from "@angular/core";
import { Ingredient } from "../models/ingredient.model";

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Tomatoes', 5),
    new Ingredient('Potatoes', 15)
  ];

  public getIngredients() {
    return this.ingredients.slice();
  }

  public addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.getIngredients());
  }

  public addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.getIngredients());
  }
}
