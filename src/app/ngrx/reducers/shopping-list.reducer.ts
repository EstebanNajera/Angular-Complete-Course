import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/models/ingredient.model";

const initialState = {
  ingredients: [
    new Ingredient('Tomatoes', 5),
    new Ingredient('Potatoes', 15)
  ]
};

export function shoppingListReducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return {
        ...state,
        ingredients: [...state.ingredients, action]
      };
  }
}
