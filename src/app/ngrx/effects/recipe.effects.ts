import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs";
import { Recipe } from "src/app/models/recipe.model";

import * as RecipesActions from '../actions/recipe.actions';

@Injectable()
export class RecipesEffects {
  @Effect() fectRecipes = this.actions$.pipe(
    ofType(RecipesActions.FECT_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>('https://ng-complete-guide-93fe9.firebaseio.com/recipes.json')
    }), map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }), map(recipes => {
      return new RecipesActions.SetRecipes(recipes);
    })
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient) {}
}
