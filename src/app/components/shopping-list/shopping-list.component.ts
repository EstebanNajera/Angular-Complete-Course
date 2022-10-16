import { Component } from "@angular/core";
import { Ingredient } from "src/app/models/ingredient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    new Ingredient('Tomatoes', 5),
    new Ingredient('Potatoes', 15)
  ];

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
