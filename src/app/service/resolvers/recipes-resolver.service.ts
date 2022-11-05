import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from "@ngrx/store";
import { Observable, take } from 'rxjs';
import { Recipe } from "src/app/models/recipe.model";
import * as fromApp from '../../ngrx/store/app.reducer';
import * as RecipesActions from '../../ngrx/actions/recipe.actions';
import { Actions, ofType } from "@ngrx/effects";

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    this.store.dispatch(new RecipesActions.FetchRecipes());
    return this.actions.pipe(
      ofType(RecipesActions.SET_RECIPES),
      take(1)
    );
  }
}
