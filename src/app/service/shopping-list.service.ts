import { Subject } from "rxjs";
import { Ingredient } from "../models/ingredient.model";

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Tomatoes', 5),
    new Ingredient('Potatoes', 15)
  ];

  public getIngredients() {
    return this.ingredients.slice();
  }

  public getIngredient(index: number) {
    return this.ingredients[index];
  }

  public addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.getIngredients());
  }

  public addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.getIngredients());
  }

  public updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  public deleteItem(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
