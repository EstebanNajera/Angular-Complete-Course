import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { Recipe } from "../models/recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
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
    },
    tap((recipes: Recipe[]) => {
      this.recipeService.setRecipes(recipes);
    })));
  }
}
