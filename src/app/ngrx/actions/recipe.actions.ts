import { Action } from "@ngrx/store";
import { Recipe } from "src/app/models/recipe.model";

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FECT_RECIPES = '[Recipes] Fetch Recipes';
export const ADD_RECIPE = '[Recipes] Add Recipe';
export const UPDATE_RECIPE = '[Recipes] Update Recipe';
export const DELETE_RECIPE = '[Recipes] Delete Recipe';
export const STORE_RECIPES = '[Recipes] Store Recipe';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type = FECT_RECIPES;
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: {index: number, newRecipe:Recipe}) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {}
}

export class StoreRecipe implements Action {
  readonly type = STORE_RECIPES;
}

export type RecipesActions =
  SetRecipes |
  FetchRecipes |
  AddRecipe |
  UpdateRecipe |
  DeleteRecipe |
  StoreRecipe;
