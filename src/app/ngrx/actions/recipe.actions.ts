import { Action } from "@ngrx/store";
import { Recipe } from "src/app/models/recipe.model";

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FECT_RECIPES = '[Recipes] Fetch Recipes';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type = FECT_RECIPES;
}

export type RecipesActions =
  SetRecipes |
  FetchRecipes;
