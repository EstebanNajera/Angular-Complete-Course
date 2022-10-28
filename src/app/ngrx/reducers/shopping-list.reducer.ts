import { Ingredient } from "src/app/models/ingredient.model";
import * as ShoppingListActions  from "../actions/shopping-list.actions";

const initialState = {
  ingredients: [
    new Ingredient('Tomatoes', 5),
    new Ingredient('Potatoes', 15)
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
  }
}
