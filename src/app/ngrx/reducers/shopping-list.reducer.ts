import { Ingredient } from "src/app/models/ingredient.model";
import * as ShoppingListActions  from "../actions/shopping-list.actions";

export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Tomatoes', 5),
    new Ingredient('Potatoes', 15)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
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
      const index = state.editedIngredientIndex;
      const newIngredient = action.payload;
      const ingredient = state.ingredients[index];
      const updatedIngredient = {
        ...ingredient,
        ...newIngredient
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[index] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    }
    case ShoppingListActions.DELETE_INGREDIENT: {
      const index = state.editedIngredientIndex;
      /*const ingredients = [...state.ingredients];
      const updatedIngredients = ingredients.splice(index, 1);*/
      return {
        ...state,
        ingredients: state.ingredients.filter((ing, ingIdx) => {
          return ingIdx !== index;
        }),
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    }
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] }
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return { ...state };
  }
}
