import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, tap } from "rxjs";
import { Recipe } from "../models/recipe.model";
import { RecipeService } from "./recipe.service";
import * as fromApp from '../ngrx/reducers/recipe.reducer';
import * as RecipesActions from '../ngrx/actions/recipe.actions';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    public store: Store<fromApp.State>
  ) {}

  public storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-complete-guide-93fe9.firebaseio.com/recipes.json', recipes).subscribe(
      (response) => {

      }
    );
  }

  public fetchRecipes() {
    return this.http.get<Recipe[]>('https://ng-complete-guide-93fe9.firebaseio.com/recipes.json')
    .pipe(map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }),
    tap((recipes: Recipe[]) => {
      this.store.dispatch(new RecipesActions.SetRecipes(recipes));
    }));
  }
}
