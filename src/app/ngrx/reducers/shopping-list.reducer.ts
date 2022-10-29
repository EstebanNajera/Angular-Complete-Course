import { Ingredient } from "src/app/models/ingredient.model";
import * as ShoppingListActions  from "../actions/shopping-list.actions";

const initialState = {
  ingredients: [
    new Ingredient('Tomatoes', 5),
    new Ingredient('Potatoes', 15)
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT: {
      const index = action.payload.index;
      const newIngredient = action.payload.newIngredient;
      const ingredient = state.ingredients[index];
      const updatedIngredient = {
        ...ingredient,
        ...newIngredient
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[index] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients
      };
    }
    case ShoppingListActions.DELETE_INGREDIENT: {
      const index = action.payload;
      /*const ingredients = [...state.ingredients];
      const updatedIngredients = ingredients.splice(index, 1);*/
      return {
        ...state,
        ingredients: state.ingredients.filter((ing, ingIdx) => {
          return ingIdx !== index;
        })
      };
    }
    default:
      return { ...state };
  }
}
